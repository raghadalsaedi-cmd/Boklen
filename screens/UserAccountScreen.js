import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For some specific icons if needed

const COLORS = {
    primary: '#ecc813',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
    success: '#22c55e',
    successBg: '#dcfce7',
};

export default function UserAccountScreen({ navigation }) {

    const UserProfileSection = () => (
        <View style={styles.profileSection}>
            <Text style={styles.userName}>محمد آل سعود</Text>
            <Text style={styles.userPhone}>+966 54 123 4567</Text>
            <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={16} color={COLORS.success} />
                <Text style={styles.verifiedText}>مستخدم موثق</Text>
            </View>
        </View>
    );

    const MenuSection = ({ title, items }) => (
        <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.menuCard}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.menuItem,
                            index === items.length - 1 && { borderBottomWidth: 0 }
                        ]}
                        onPress={item.onPress}
                    >
                        <View style={styles.menuItemLeft}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name={item.icon} size={24} color={COLORS.primary} />
                            </View>
                            <View>
                                <Text style={styles.menuItemTitle}>{item.title}</Text>
                                {item.subtitle && <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>}
                            </View>
                        </View>
                        {item.value ? (
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueText}>{item.value}</Text>
                                <MaterialIcons name="chevron-left" size={24} color="#94a3b8" />
                            </View>
                        ) : (
                            <MaterialIcons name="chevron-left" size={24} color="#94a3b8" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <UserProfileSection />

                {/* Account Info */}
                <MenuSection
                    title="معلومات الحساب"
                    items={[
                        { title: 'البيانات الشخصية', icon: 'person', onPress: () => { } },
                        { title: 'العناوين المحفوظة', icon: 'location-on', onPress: () => { } },
                    ]}
                />

                {/* Invoices & Docs */}
                <MenuSection
                    title="الفواتير والمستندات"
                    items={[
                        { title: 'الفواتير', icon: 'receipt', onPress: () => navigation.navigate('UserInvoices') },
                        { title: 'سياسة الخصوصية', icon: 'policy', onPress: () => { } },
                    ]}
                />

                {/* Settings */}
                <MenuSection
                    title="الإعدادات"
                    items={[
                        { title: 'اللغة', icon: 'language', value: 'العربية', onPress: () => { } },
                        { title: 'الإشعارات', icon: 'notifications', onPress: () => { } },
                    ]}
                />

                {/* Logout Actions */}
                <View style={styles.logoutSection}>
                    <TouchableOpacity style={styles.logoutButton}>
                        <MaterialIcons name="logout" size={20} color={COLORS.textGray} />
                        <Text style={styles.logoutText}>تسجيل الخروج</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteButton}>
                        <MaterialIcons name="delete-forever" size={20} color="#ef4444" />
                        <Text style={styles.deleteText}>حذف الحساب</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Nav */}
            <SafeAreaView edges={['bottom']} style={styles.bottomNav}>
                <View style={styles.bottomNavContent}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHome')}>
                        <MaterialIcons name="home" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>الرئيسية</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserOrders')}
                    >
                        <MaterialIcons name="receipt-long" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>طلباتي</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserSupport')}
                    >
                        <MaterialIcons name="support-agent" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>الدعم</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                    // Already on Account
                    >
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ position: 'relative' }}>
                                <MaterialIcons name="person" size={26} color={COLORS.primary} />
                                <View style={styles.activeDot} />
                            </View>
                            <Text style={[styles.navLabel, { color: COLORS.primary }]}>حسابي</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 60, // approximate status bar + safety
        paddingBottom: 16,
        backgroundColor: 'rgba(248, 248, 246, 0.95)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    settingsButton: {
        width: 40,
        alignItems: 'flex-end',
    },
    scrollContent: {
        paddingBottom: 100, // Space for bottom nav
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    userPhone: {
        fontSize: 14,
        color: COLORS.textGray,
        marginBottom: 12,
        // layout direction handled by React Native automatically if I don't force it.
        // For numbers, sometimes explicit LTR is needed.
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.successBg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.success,
    },
    menuSection: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textGray,
        marginBottom: 8,
        paddingHorizontal: 8,
        textAlign: 'right',
    },
    menuCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(236, 200, 19, 0.1)', // primary with opacity
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textDark,
        marginBottom: 2,
    },
    menuItemSubtitle: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    valueText: {
        fontSize: 14,
        color: COLORS.textGray,
    },
    logoutSection: {
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 24,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
        backgroundColor: '#fee2e2',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fecaca',
    },
    deleteText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ef4444',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 10,
    },
    bottomNavContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 64,
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        minWidth: 64,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    activeDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444', // Red dot as per design
        borderWidth: 1.5,
        borderColor: COLORS.surfaceLight,
    },
});
