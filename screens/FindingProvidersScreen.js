import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ecc813',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#1b190d',
    textGray: '#5c5a4d',
};

export default function FindingProvidersScreen({ navigation }) {
    // Animation values
    const pulseAnim = new Animated.Value(1);
    const progressWidth = new Animated.Value(20); // Starts at 20%

    useEffect(() => {
        // Start pulsing animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Simulate progress bar
        Animated.timing(progressWidth, {
            toValue: 100, // 100%
            duration: 3000,
            useNativeDriver: false, // width doesn't support native driver
        }).start();

        // Navigate after delay
        const timer = setTimeout(() => {
            navigation.replace('MatchingProviders');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.iconButton}>
                        {/* Placeholder for alignment */}
                    </View>
                    <Text style={styles.headerTitle}>البحث عن مقدمي الخدمة</Text>
                    <View style={styles.iconButton} />
                </View>
            </SafeAreaView>

            <View style={styles.content}>
                {/* Stepper Dots */}
                <View style={styles.stepperContainer}>
                    <View style={styles.dotFilled} />
                    <View style={styles.dotFilled} />
                    <View style={styles.dotProgress}>
                        <View style={styles.dotProgressInner} />
                    </View>
                </View>
                <Text style={styles.statusText}>جاري المعالجة...</Text>

                {/* Main Animation */}
                <View style={styles.animContainer}>
                    <View style={styles.pulseDisk}>
                        <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }], opacity: 0.2 }]} />
                        <Animated.View style={[styles.pulseCircleInner, { transform: [{ scale: pulseAnim }], opacity: 0.1 }]} />
                        <View style={styles.iconCircle}>
                            <MaterialIcons name="person-search" size={48} color={COLORS.primary} />
                        </View>
                    </View>
                    <Text style={styles.searchingTitle}>جاري البحث عن مقدمي الخدمة...</Text>
                    <Text style={styles.searchingDesc}>
                        يرجى الانتظار، نقوم الآن بإبلاغ الشركاء القريبين بطلبك للحصول على أفضل العروض.
                    </Text>
                </View>

                {/* Request Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.loadingBar} />

                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderTitle}>ملخص الطلب (٣ معدات)</Text>
                        <View style={styles.activeTag}>
                            <View style={styles.activeDot} />
                            <Text style={styles.activeText}>نشط</Text>
                        </View>
                    </View>

                    <View style={styles.cardItems}>
                        {/* Item 1 */}
                        <View style={styles.cardItem}>
                            <View style={styles.itemImageContainer}>
                                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4D0aFVagLz3E02lodHN8GPVm8NVelqsDiQmDnpUxx7q57A4pE1XqaartSCizA-yQctWKpMf1_L1HeoNHYXPcTn2SJ7joOMyd4Uc82t1bImv-MTWqqIQPipO6qGVSRRcQ5G3ZMfqe2zja2uaNle_qbVn9vJa8D3lgy7An5RyZiaAjrapeu_rWQNNcCF5Knm_5NCAAextI0Utzz93dDxjl2zMN26A6CiX6Wr1AcLzU7fWvb0voKTXUErGdsCWYkQrz9cjcxx9jpDLg' }} style={styles.itemImage} />
                            </View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle} numberOfLines={1}>٢ x حفارة - ٢٠ طن</Text>
                                <Text style={styles.itemSub} numberOfLines={1}>مع سائق، يومية</Text>
                            </View>
                            <View style={styles.searchIconContainer}>
                                <MaterialIcons name="search" size={14} color={COLORS.primary} />
                            </View>
                        </View>

                        {/* Item 2 */}
                        <View style={styles.cardItem}>
                            <View style={styles.itemImageContainer}>
                                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAflER3WWr2o4xrc_214_7VimkbDCf27pDZEOOPnQ2ytEaVeWbfpE4Ir5Qa0kGW0_PAwrca48bBn-dE4rzSdy2kMjVyRgSNHaEbZ2ygz38YZwBwNDW4nZt5LYTkfyHtTZ54T-ZzXFd9ZTEf-zpF9_XXrNez5S5ok7g7B15dS7FzXgE23cP5r1EX1gjvdgRDBzpwI-M13wrEaSt4BHZZ9lJRTgspej7DDt6wmDRSkUzsT2Z2G1D69RlH8dKghwHd8oLSseb8FI2dc28' }} style={styles.itemImage} />
                            </View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle} numberOfLines={1}>١ x شاحنة قلابة</Text>
                                <Text style={styles.itemSub} numberOfLines={1}>بدون سائق، شهرية</Text>
                            </View>
                            <View style={styles.searchIconContainer}>
                                <MaterialIcons name="search" size={14} color={COLORS.primary} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom Nav Placeholder (Visual only) */}
            <View style={styles.bottomNav}>
                <View style={styles.navItem}>
                    <MaterialIcons name="home" size={24} color={COLORS.textGray} />
                    <Text style={styles.navText}>الرئيسية</Text>
                </View>
                <View style={styles.navItemCenter}>
                    <View style={styles.navBadge}>
                        <Text style={styles.navBadgeText}>2</Text>
                    </View>
                    <MaterialIcons name="assignment" size={24} color={COLORS.primary} />
                    <Text style={[styles.navText, { fontWeight: 'bold', color: COLORS.primary }]}>الطلبات</Text>
                </View>
                <View style={styles.navItem}>
                    <MaterialIcons name="person" size={24} color={COLORS.textGray} />
                    <Text style={styles.navText}>حسابي</Text>
                </View>
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
        borderBottomColor: '#e6e4db',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 56,
    },
    iconButton: {
        width: 40,
        height: 40,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    stepperContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    dotFilled: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },
    dotProgress: {
        width: 32,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e6e4db',
        overflow: 'hidden',
    },
    dotProgressInner: {
        width: '50%', // Animated in real scenario
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
        marginTop: 8,
    },
    animContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
        width: '100%',
    },
    pulseDisk: {
        width: 192,
        height: 192,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    pulseCircle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 96,
        backgroundColor: COLORS.primary,
    },
    pulseCircleInner: {
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: 80,
        backgroundColor: COLORS.primary,
    },
    iconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: COLORS.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 4,
        borderColor: 'rgba(236, 200, 19, 0.1)',
    },
    searchingTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
        marginBottom: 12,
    },
    searchingDesc: {
        fontSize: 14,
        color: COLORS.textGray,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: '80%',
    },
    summaryCard: {
        width: '100%',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e6e4db',
        overflow: 'hidden',
        padding: 16,
    },
    loadingBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 4,
        backgroundColor: COLORS.primary,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        paddingBottom: 8,
    },
    cardHeaderTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textGray,
    },
    activeTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#22c55e',
    },
    activeText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#16a34a',
    },
    cardItems: {
        gap: 12,
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    itemImageContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.9,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    itemSub: {
        fontSize: 10,
        color: COLORS.textGray,
    },
    searchIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(236, 200, 19, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: '#e6e4db',
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
    },
    navItemCenter: {
        alignItems: 'center',
        gap: 4,
    },
    navText: {
        fontSize: 10,
        color: COLORS.textGray,
    },
    navBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#ef4444',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    navBadgeText: {
        color: 'white',
        fontSize: 9,
        fontWeight: 'bold',
    },
});
