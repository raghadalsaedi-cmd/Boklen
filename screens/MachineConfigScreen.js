import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ecc813',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#1b190d',
    textGray: '#5c5a4d',
    border: '#e6e4db',
    primaryContent: '#1b190d',
};

export default function MachineConfigScreen({ navigation, route }) {
    const { machine } = route.params || {};
    const [rentalType, setRentalType] = useState('daily'); // 'trip', 'daily', 'monthly'
    const [driverOption, setDriverOption] = useState('with_driver'); // 'with_driver', 'without_driver'
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');

    const handleAddToCart = () => {
        // In a real app, this would update a global cart context or redux store
        // For now, we'll just navigate back
        navigation.goBack();
    };

    if (!machine) return null;

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>تخصيص المعدة</Text>
                    <View style={styles.iconButton} />
                </View>
            </SafeAreaView>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Machine Details Card */}
                <View style={styles.machineCard}>
                    <View style={styles.machineRow}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: machine.image }} style={styles.image} />
                        </View>
                        <View style={styles.machineInfo}>
                            <Text style={styles.machineTitle}>{machine.title}</Text>
                            <Text style={styles.machineSubtitle}>{machine.subtitle}</Text>
                            <View style={styles.verifiedTag}>
                                <MaterialIcons name="verified" size={14} color="#a16207" />
                                <Text style={styles.verifiedText}>معدات مضمونة</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Rental Type */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>نوع الإيجار</Text>
                    <View style={styles.rentalTypesGrid}>
                        {['trip', 'daily', 'monthly'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.rentalTypeCard,
                                    rentalType === type && styles.rentalTypeActive
                                ]}
                                onPress={() => setRentalType(type)}
                            >
                                <MaterialIcons
                                    name={type === 'trip' ? 'local-shipping' : type === 'daily' ? 'calendar-today' : 'calendar-view-month'}
                                    size={32}
                                    color={rentalType === type ? COLORS.primary : '#94a3b8'}
                                />
                                <Text style={styles.rentalTypeName}>
                                    {type === 'trip' ? 'بالرد' : type === 'daily' ? 'يومية' : 'شهرية'}
                                </Text>
                                {rentalType === type && (
                                    <View style={styles.checkIcon}>
                                        <MaterialIcons name="check" size={14} color="black" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Operating Options */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>خيارات التشغيل</Text>
                    <View style={styles.optionsList}>
                        <TouchableOpacity
                            style={styles.optionCard}
                            onPress={() => setDriverOption('with_driver')}
                        >
                            <View style={styles.optionRow}>
                                <View style={styles.optionIcon}>
                                    <MaterialIcons name="person" size={24} color="#64748b" />
                                </View>
                                <View style={styles.optionInfo}>
                                    <Text style={styles.optionTitle}>مع سائق</Text>
                                    <Text style={styles.optionSub}>يشمل تكاليف السائق والاعاشة</Text>
                                </View>
                                <View style={styles.radioContainer}>
                                    {driverOption === 'with_driver' && <View style={styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.optionCard}
                            onPress={() => setDriverOption('without_driver')}
                        >
                            <View style={styles.optionRow}>
                                <View style={styles.optionIcon}>
                                    <MaterialIcons name="no-accounts" size={24} color="#64748b" />
                                </View>
                                <View style={styles.optionInfo}>
                                    <Text style={styles.optionTitle}>بدون سائق</Text>
                                    <Text style={styles.optionSub}>توفير السائق على المستأجر</Text>
                                </View>
                                <View style={styles.radioContainer}>
                                    {driverOption === 'without_driver' && <View style={styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Quantity */}
                <View style={styles.quantityCard}>
                    <View>
                        <Text style={styles.quantityTitle}>الكمية المطلوبة</Text>
                        <Text style={styles.quantitySub}>عدد الردود أو الأيام</Text>
                    </View>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <MaterialIcons name="remove" size={20} color={COLORS.textDark} />
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{quantity}</Text>
                        <TouchableOpacity
                            style={[styles.qtyBtn, styles.qtyBtnAdd]}
                            onPress={() => setQuantity(quantity + 1)}
                        >
                            <MaterialIcons name="add" size={20} color={COLORS.primaryContent} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Notes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ملاحظات إضافية (اختياري)</Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="مثال: يرجى توفير لي (هوز) إضافي بطول 10 متر..."
                        placeholderTextColor="#9ca3af"
                        multiline
                        textAlignVertical="top"
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>

            </ScrollView>

            {/* Bottom Action */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.addToCartBtn}
                    onPress={handleAddToCart}
                >
                    <MaterialIcons name="add-shopping-cart" size={24} color={COLORS.primaryContent} />
                    <Text style={styles.addToCartText}>إضافة إلى الطلب</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        backgroundColor: 'rgba(248, 248, 246, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        zIndex: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 64,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
        gap: 16,
    },
    machineCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    machineRow: {
        flexDirection: 'row',
        gap: 16,
    },
    imageContainer: {
        width: 96,
        height: 96,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    machineInfo: {
        flex: 1,
        paddingTop: 4,
    },
    machineTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    machineSubtitle: {
        fontSize: 14,
        color: '#a16207', // Gold-ish color from reference
        marginBottom: 12,
        fontWeight: '500',
    },
    verifiedTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fefce8',
        borderColor: '#fef08a',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        gap: 4,
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#a16207',
    },
    section: {
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    rentalTypesGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    rentalTypeCard: {
        flex: 1,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 112,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    rentalTypeActive: {
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(236, 200, 19, 0.05)',
    },
    rentalTypeName: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    checkIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsList: {
        gap: 12,
    },
    optionCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: 'transparent', // Can add active state here if needed, reference uses radio
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionInfo: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    optionSub: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    radioContainer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#cbd5e1', // Default border
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
    quantityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
    },
    quantityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    quantitySub: {
        fontSize: 12,
        color: COLORS.textGray,
        marginTop: 4,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 24,
        padding: 4,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        gap: 12,
    },
    qtyBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    qtyBtnAdd: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    qtyValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
        minWidth: 20,
        textAlign: 'center',
        marginBottom: 4,
    },
    notesInput: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        padding: 12,
        height: 100,
        textAlign: 'right',
        fontSize: 14,
        color: COLORS.textDark,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        padding: 16,
        paddingBottom: 32, // Safe area
    },
    addToCartBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primaryContent,
    },
});
