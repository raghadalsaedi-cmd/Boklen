import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ecc813',
    primaryContent: '#181711',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
    borderLight: '#e6e4db',
};

export default function VerificationPendingScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Status Illustration */}
                <View style={styles.illustrationContainer}>
                    <View style={styles.iconCircle}>
                        <MaterialIcons name="pending-actions" size={80} color={COLORS.primary} />
                    </View>
                </View>

                <Text style={styles.title}>طلبك قيد المراجعة</Text>
                <Text style={styles.description}>
                    شكرًا لرفع السجل التجاري. يقوم فريقنا حاليًا بمراجعة مستنداتك لضمان جودة الخدمة. سنقوم بتفعيل حسابك وإشعارك فور الانتهاء.
                </Text>

                {/* Refresh Button */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('FleetManagement')}
                >
                    <Text style={styles.primaryButtonText}>تحديث الحالة</Text>
                    <MaterialIcons name="refresh" size={20} color={COLORS.primaryContent} />
                </TouchableOpacity>

                {/* Support Button */}
                <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>تواصل مع الدعم</Text>
                    <MaterialIcons name="chat" size={20} color={COLORS.textLight} />
                </TouchableOpacity>

                {/* Notification Prompt */}
                <View style={styles.notificationBox}>
                    <MaterialIcons name="notifications-active" size={24} color={COLORS.primary} />
                    <View style={styles.notificationContent}>
                        <Text style={styles.notificationTitle}>تفعيل التنبيهات</Text>
                        <Text style={styles.notificationText}>سنقوم بإشعارك فور اكتمال عملية التحقق.</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    illustrationContainer: {
        marginBottom: 24,
    },
    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(236, 200, 19, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: COLORS.subtextLight,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        maxWidth: 320,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 16,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primaryContent,
        marginRight: 8,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 32,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textLight,
        marginRight: 8,
    },
    notificationBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(236, 200, 19, 0.1)',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        alignItems: 'flex-start',
    },
    notificationContent: {
        flex: 1,
        marginLeft: 12,
    },
    notificationTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textLight,
        textAlign: 'right',
    },
    notificationText: {
        fontSize: 14,
        color: COLORS.subtextLight,
        marginTop: 4,
        textAlign: 'right',
    },
});
