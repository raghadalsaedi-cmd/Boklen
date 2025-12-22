import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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

export default function UploadDocsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>توثيق الحساب</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialIcons name="help" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressStep, styles.progressActive]} />
                    <View style={[styles.progressStep, styles.progressActive]} />
                    <View style={[styles.progressStep, styles.progressActive]} />
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>إرفاق المستندات</Text>
                    <Text style={styles.subtitle}>
                        لإكمال عملية التسجيل، يرجى إرفاق نسخة سارية المفعول من السجل التجاري والهوية الوطنية للتحقق من الأهلية.
                    </Text>
                </View>

                {/* Security Info Box */}
                <View style={styles.infoBox}>
                    <MaterialIcons name="verified-user" size={24} color={COLORS.primary} />
                    <View style={styles.infoBoxContent}>
                        <Text style={styles.infoBoxTitle}>بياناتك محمية ومشفرة</Text>
                        <Text style={styles.infoBoxText}>يتم استخدام هذه المستندات فقط للتحقق من هوية المنشأة وضمان الموثوقية في السوق.</Text>
                    </View>
                </View>

                {/* CR Upload */}
                <View style={styles.uploadSection}>
                    <View style={styles.uploadHeader}>
                        <Text style={styles.uploadLabel}>السجل التجاري</Text>
                        <View style={styles.requiredBadge}>
                            <Text style={styles.requiredBadgeText}>مطلوب</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.uploadBox}>
                        <View style={styles.uploadIconContainer}>
                            <MaterialIcons name="description" size={28} color={COLORS.primary} />
                        </View>
                        <Text style={styles.uploadText}>اضغط لرفع السجل التجاري</Text>
                        <Text style={styles.uploadHint}>PDF, JPG, PNG (بحد أقصى 5 ميجابايت)</Text>
                    </TouchableOpacity>
                </View>

                {/* ID Upload */}
                <View style={styles.uploadSection}>
                    <View style={styles.uploadHeader}>
                        <Text style={styles.uploadLabel}>الهوية الوطنية</Text>
                        <View style={styles.requiredBadge}>
                            <Text style={styles.requiredBadgeText}>مطلوب</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.uploadBox}>
                        <View style={styles.uploadIconContainer}>
                            <MaterialIcons name="badge" size={28} color={COLORS.primary} />
                        </View>
                        <Text style={styles.uploadText}>اضغط لرفع الهوية الوطنية</Text>
                        <Text style={styles.uploadHint}>PDF, JPG, PNG (بحد أقصى 5 ميجابايت)</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('VerificationPending')}
                >
                    <Text style={styles.primaryButtonText}>إرسال للتحقق</Text>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.primaryContent} />
                </TouchableOpacity>
                <View style={styles.securityNote}>
                    <MaterialIcons name="lock" size={14} color={COLORS.textLight} />
                    <Text style={styles.securityText}>نحن نضمن سرية وخصوصية بياناتك</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.surfaceLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 32,
    },
    progressStep: {
        flex: 1,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.borderLight,
    },
    progressActive: {
        backgroundColor: COLORS.primary,
    },
    titleSection: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 8,
        textAlign: 'right',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtextLight,
        lineHeight: 24,
        textAlign: 'right',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(236, 200, 19, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(236, 200, 19, 0.2)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        alignItems: 'flex-start',
    },
    infoBoxContent: {
        flex: 1,
        marginLeft: 12,
    },
    infoBoxTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textLight,
        textAlign: 'right',
    },
    infoBoxText: {
        fontSize: 12,
        color: COLORS.subtextLight,
        marginTop: 4,
        textAlign: 'right',
    },
    uploadSection: {
        marginBottom: 24,
    },
    uploadHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    uploadLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    requiredBadge: {
        backgroundColor: 'rgba(236, 200, 19, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    requiredBadgeText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.primary,
    },
    uploadBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: COLORS.borderLight,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
    },
    uploadIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    uploadText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 4,
    },
    uploadHint: {
        fontSize: 12,
        color: COLORS.subtextLight,
    },
    bottomContainer: {
        padding: 16,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primaryContent,
        marginRight: 8,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        opacity: 0.6,
    },
    securityText: {
        fontSize: 12,
        color: COLORS.textLight,
        marginLeft: 6,
    },
});
