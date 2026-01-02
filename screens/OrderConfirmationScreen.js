import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ebc024',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#FFFFFF',
    textDark: '#212121',
    textGray: '#757575',
    border: '#EEEEEE',
};

export default function OrderConfirmationScreen({ navigation, route }) {
    const { equipment = 'Dozer CAT D9', price = 5000, duration = 3 } = route.params || {};

    return (
        <View style={styles.container}>
            {/* Background Map */}
            <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB093hROoMfGL4ymbuTgfT6DRa_YClX0WcusE0BPOR9Z92WrTmo4mTHsq54mBP6yOE02N-pFgvCTiEwC7YuWusn--ANSFsqQQrgFz0nXb6mWOWmPmLI8oTO5fnHiL8M6hJA7VFQd1N3u_q5IBuqMxdNtLFs5uc46wVV565k4-q-sGybUg2P0Z3LHIrNBVMzDEqkY42-EJiyUWikiiGb5VLGYqAW8313TyTfDoF2toYSZEhq_odmv_M_A9eZxIM5tD50fSHIASCxi58o' }}
                style={styles.backgroundMap}
                blurRadius={2}
            >
                <View style={styles.overlay} />
            </ImageBackground>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>
                {/* Handle */}
                <View style={styles.handleContainer}>
                    <View style={styles.handle} />
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>تأكيد الطلب</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="close" size={20} color={COLORS.textGray} />
                    </TouchableOpacity>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryContainer}>
                    {/* Equipment Card */}
                    <View style={styles.equipmentCard}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="construction" size={24} color={COLORS.primary} />
                        </View>
                        <View style={styles.equipmentDetails}>
                            <Text style={styles.label}>المعدة</Text>
                            <Text style={styles.equipmentName}>{equipment}</Text>
                        </View>
                    </View>

                    {/* Price and Duration Grid */}
                    <View style={styles.grid}>
                        {/* Price Card */}
                        <View style={styles.gridCard}>
                            <View style={styles.cardHeader}>
                                <MaterialIcons name="payments" size={20} color={COLORS.primary} />
                                <Text style={styles.label}>السعر النهائي</Text>
                            </View>
                            <Text style={styles.cardValue}>{price} SAR</Text>
                        </View>

                        {/* Duration Card */}
                        <View style={styles.gridCard}>
                            <View style={styles.cardHeader}>
                                <MaterialIcons name="calendar-month" size={20} color={COLORS.primary} />
                                <Text style={styles.label}>مدة العمل</Text>
                            </View>
                            <Text style={styles.cardValue}>{duration} أيام</Text>
                        </View>
                    </View>
                </View>

                {/* Confirmation Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => {
                            // Navigate to success screen or go back to home
                            navigation.navigate('UserHome');
                        }}
                    >
                        <Text style={styles.confirmButtonText}>تأكيد وحجز الطلب</Text>
                        <MaterialIcons name="check-circle" size={20} color={COLORS.textDark} />
                    </TouchableOpacity>
                </View>

                {/* Success Message */}
                <View style={styles.successMessageContainer}>
                    <View style={styles.successMessage}>
                        <Text style={styles.successMessageText}>
                            تم الاتفاق بنجاح، سيتم إشعار الشركات الأخرى بإغلاق الطلب
                        </Text>
                    </View>
                </View>

                {/* Safe Area Bottom */}
                <SafeAreaView edges={['bottom']} style={styles.safeBottom} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundMap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.12,
        shadowRadius: 30,
        elevation: 10,
    },
    handleContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 8,
    },
    handle: {
        width: 48,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#d1d5db',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        letterSpacing: -0.5,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    summaryContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 12,
    },
    equipmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(235, 192, 36, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    equipmentDetails: {
        flex: 1,
        gap: 2,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    equipmentName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'right',
    },
    grid: {
        flexDirection: 'row',
        gap: 12,
    },
    gridCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingBottom: 12,
    },
    confirmButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181611',
    },
    successMessageContainer: {
        paddingHorizontal: 24,
        paddingTop: 4,
        paddingBottom: 32,
    },
    successMessage: {
        backgroundColor: '#f0fdf4',
        borderWidth: 1,
        borderColor: '#dcfce7',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    successMessageText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#16a34a',
        textAlign: 'center',
        lineHeight: 18,
    },
    safeBottom: {
        backgroundColor: COLORS.surfaceLight,
        height: 8,
    },
});
