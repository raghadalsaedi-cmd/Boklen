import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#EBC024',
    backgroundLight: '#FAFAFA',
    surfaceLight: '#FFFFFF',
    textLight: '#1e293b',
    textDark: '#212121',
    subtext: '#757575',
    border: '#e2e8f0',
};

export default function AccountTypeSelectionScreen({ navigation }) {
    const [selectedType, setSelectedType] = useState(null);

    const handleContinue = () => {
        if (selectedType === 'company') {
            navigation.navigate('CompanyInfo');
        } else if (selectedType === 'individual') {
            navigation.navigate('IndividualOwnerID');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <View style={{ width: 40 }} />
                </View>
                <Text style={styles.headerTitle}>اختر نوع الحساب</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressStep} />
                    <View style={styles.progressStep} />
                    <View style={styles.progressStep} />
                </View>

                <Text style={styles.title}>من سيقوم باستخدام التطبيق؟</Text>
                <Text style={styles.subtitle}>
                    قم باختيار نوع الحساب المناسب لنشاطك التجاري
                </Text>

                {/* Selection Cards */}
                <View style={styles.cardsContainer}>
                    {/* Individual Card */}
                    <TouchableOpacity
                        style={[
                            styles.card,
                            selectedType === 'individual' && styles.cardSelected
                        ]}
                        onPress={() => setSelectedType('individual')}
                    >
                        <View style={[
                            styles.iconContainer,
                            selectedType === 'individual' && styles.iconContainerSelected
                        ]}>
                            <MaterialIcons
                                name="person"
                                size={32}
                                color={selectedType === 'individual' ? COLORS.primary : COLORS.subtext}
                            />
                        </View>
                        <Text style={[
                            styles.cardTitle,
                            selectedType === 'individual' && styles.cardTitleSelected
                        ]}>
                            فرد / مالك معدة
                        </Text>
                        <Text style={styles.cardSubtitle}>
                            للمشغلين وملاك المعدات المستقلين
                        </Text>
                    </TouchableOpacity>

                    {/* Company Card */}
                    <TouchableOpacity
                        style={[
                            styles.card,
                            selectedType === 'company' && styles.cardSelected
                        ]}
                        onPress={() => setSelectedType('company')}
                    >
                        <View style={[
                            styles.iconContainer,
                            selectedType === 'company' && styles.iconContainerSelected
                        ]}>
                            <MaterialIcons
                                name="business"
                                size={32}
                                color={selectedType === 'company' ? COLORS.primary : COLORS.subtext}
                            />
                        </View>
                        <Text style={[
                            styles.cardTitle,
                            selectedType === 'company' && styles.cardTitleSelected
                        ]}>
                            شركة / مؤسسة
                        </Text>
                        <Text style={styles.cardSubtitle}>
                            لأصحاب السجلات التجارية
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Banner */}
                <ImageBackground
                    source={require('../assets/heavy_machinery_banner.png')}
                    style={styles.banner}
                    imageStyle={styles.bannerImage}
                >
                    <View style={styles.bannerOverlay}>
                        <Text style={styles.bannerText}>Ready to build?</Text>
                    </View>
                </ImageBackground>

                {/* Continue Button */}
                <TouchableOpacity
                    style={[
                        styles.primaryButton,
                        !selectedType && styles.disabledButton
                    ]}
                    onPress={handleContinue}
                    disabled={!selectedType}
                >
                    <Text style={styles.primaryButtonText}>استمرار</Text>
                    <MaterialIcons name="arrow-back" size={20} color={COLORS.textDark} />
                </TouchableOpacity>

                {/* Security Note */}
                <View style={styles.securityNote}>
                    <MaterialIcons name="verified-user" size={14} color={COLORS.subtext} />
                    <Text style={styles.securityText}>جميع المسارات تتطلب التحقق من الهوية</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        backgroundColor: COLORS.surfaceLight,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 8,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.backgroundLight,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 32,
        width: '100%',
    },
    progressStep: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.border,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtext,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        maxWidth: 280,
    },
    cardsContainer: {
        flexDirection: 'row',
        gap: 16,
        width: '100%',
        marginBottom: 24,
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surfaceLight,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    iconContainerSelected: {
        backgroundColor: 'rgba(235, 192, 36, 0.1)',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 8,
        textAlign: 'center',
    },
    cardTitleSelected: {
        color: COLORS.textDark,
    },
    cardSubtitle: {
        fontSize: 12,
        color: COLORS.subtext,
        textAlign: 'center',
        lineHeight: 18,
    },
    banner: {
        width: '100%',
        height: 140,
        borderRadius: 16,
        marginBottom: 24,
        overflow: 'hidden',
    },
    bannerImage: {
        borderRadius: 16,
    },
    bannerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    primaryButton: {
        width: '100%',
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 16,
    },
    primaryButtonText: {
        color: COLORS.textDark,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.6,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        opacity: 0.6,
    },
    securityText: {
        fontSize: 12,
        color: COLORS.subtext,
    },
});
