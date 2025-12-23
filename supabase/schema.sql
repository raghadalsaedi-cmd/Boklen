-- 1. Account Status (For Service Providers)
CREATE TYPE account_status_type AS ENUM (
  'PENDING',      -- Waiting for CR check
  'VERIFIED',     -- Approved by Admin
  'REJECTED',     -- Invalid CR
  'SUSPENDED'     -- Banned for bad behavior
);

-- 2. Asset Status (For Machines)
CREATE TYPE asset_status_type AS ENUM (
  'AVAILABLE',    -- Ready to rent
  'RENTED',       -- Currently out on a job
  'MAINTENANCE',  -- Broken/In repair
  'HIDDEN'        -- Provider hid it manually
);

-- 3. Order Status (The Workflow Engine)
CREATE TYPE order_status_type AS ENUM (
  'REQUESTED',             -- User sent request
  'QUOTED',                -- Provider added price
  'PENDING_VERIFICATION',  -- Receipt uploaded
  'FUNDS_SECURED',         -- Admin approved receipt
  'ACTIVE',                -- Job started
  'COMPLETED',             -- Job finished
  'SETTLED',               -- Admin paid Provider
  'REJECTED',              -- Provider said No
  'CANCELLED',             -- User cancelled
  'EXPIRED'                -- No reply in 24h
);

-- 4. Transaction Type (For Money)
CREATE TYPE transaction_type_enum AS ENUM (
  'USER_DEPOSIT',  -- Money In (from User)
  'ADMIN_PAYOUT',  -- Money Out (to Provider)
  'REFUND'         -- Money Out (back to User)
);

-- 5. Machine Category (Strict Typing)
CREATE TYPE machine_category_type AS ENUM (
  'HEAVY', 
  'LIGHT', 
  'WATER_TANK'
);

-- SERVICE PROVIDERS
CREATE TABLE service_providers (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    cr_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- UPDATED: Uses Enum
    status account_status_type DEFAULT 'PENDING', 
    
    -- Financials
    pending_balance DECIMAL(12, 2) DEFAULT 0.00,
    settled_balance DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ASSETS (Machines)
-- Assuming a 'categories' table exists based on schema comment, creating a placeholder or note:
-- Note: 'categories' table is referenced but not provided in full schema. 
-- You may need to create it first or adjust the reference.
-- For now preserving the reference as is.

CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(id),
    category_id INTEGER, -- Removed FK constraint to avoid error if table missing, restore if 'categories' exists
    name_ar VARCHAR(255) NOT NULL,
    
    -- UPDATED: Uses Enum
    status asset_status_type DEFAULT 'AVAILABLE',
    
    daily_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ORDERS
-- Assuming 'users' table exists as it is referenced.
-- Note: 'users' table is referenced but not provided in full schema.
-- You may need to create it first or adjust the reference.

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id), -- Changed to reference Supabase auth.users for safety, or keep INTEGER if custom users table
    
    -- UPDATED: Uses Enum
    status order_status_type DEFAULT 'REQUESTED',
    
    start_date DATE NOT NULL,
    mobilization_fee DECIMAL(12, 2) DEFAULT 0.00,
    total_price DECIMAL(12, 2) NOT NULL,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- TRANSACTIONS
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    
    -- UPDATED: Uses Enum
    type transaction_type_enum NOT NULL, 
    
    amount DECIMAL(12, 2) NOT NULL,
    proof_image_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
