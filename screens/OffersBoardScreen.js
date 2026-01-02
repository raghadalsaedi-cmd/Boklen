import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ebc024',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#212121',
    textGray: '#757575',
    border: '#e5e7eb',
};

const OFFERS = [
    {
        id: 1,
        name: 'شركة المعدات الثقيلة',
        rating: 4.8,
        reviewCount: 120,
        price: 500,
        duration: 3,
        verified: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9hqwyW_FUIuP2OauQZVpvAvEcMpSwwOb02_bWNwHhS_PsmQr7LeHjoKoKr7Xq1wOdRIs7vgzOCjhz3b18QZ8XCHBzwaFh_IhoJbNTiRRnZNLtMyuvO99_-m0C4DwdiglN9ruMDLIelRScB5nE_r-RbQBH76AuPXMETFAhh7vwjrXiYy9rX_WpMpdwR4XTTXgEhZfrfBZ29uNOYts_Gg1d5dOChvdkduaUmGuvmVJHANS8jptSofDCFQ0FnXe9VQNXgr7PcxEFALUX',
    },
    {
        id: 2,
        name: 'مؤسسة البناء الحديث',
        rating: 4.2,
        reviewCount: 45,
        price: 450,
        duration: 3,
        verified: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBwddvii6CYIwl8ah4-N2eyG_E15zNDBU4q36QryTapFOS1v1CAH3LxSEmBwTvSH8r654O12riWrRG0S4qnV22obFoaqv7az_zvlSmbjZULNFFmz_hy_F4unX87MwvEkRvJVtXcQkNJLV6Bf-14j_MyhgIbv-anNaOQKxtFa_cCgZRd_23SXQq5-HsBg4kdvrRTy1_j_mkOZ0RgjFeWX8sPO-eAHJubSoUuCOk5XO8KCxe40mn8mcA22PxXQ27b-B6VaQfffHxqgzs',
    },
    {
        id: 3,
        name: 'أبناء الفهد للمقاولات',
        rating: 5.0,
        reviewCount: 12,
        price: 600,
        duration: 3,
        verified: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcYx1rC4wazgkD64BYUY75SH3pU9MykcWmz6j8UWBwKKBVPCVMin3cmUU8pbagCV8kQCuOxL8hsFISWB8fpTxIAqBnQC9aJrhpKwn2PtM2CN3fQsOukERAkYDM-AJkf3JAJx2m3MQjyp70-MXqhgw0VNodum6ahNhSxA-KHbow_FQRrAQ1UizVynXVZYr-4HAUVj5TVaclMytuG-WGQFqQG0X1wGn5uIQyhLMDXeKyTegjHi4cyrsnENLHoSOoo7uiP8i_uxocb0Nh',
    },
];

export default function OffersBoardScreen({ navigation }) {
    const [searchAnimation] = useState(new Animated.Value(1));

    useEffect(() => {
        // Pulse animation for search icon
        Animated.loop(
            Animated.sequence([
                Animated.timing(searchAnimation, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(searchAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const renderOfferCard = (offer) => {
        return (
            <View key={offer.id} style={styles.offerCard}>
                <View style={styles.cardContent}>
                    {/* Company Image */}
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: offer.image }} style={styles.companyImage} />
                    </View>

                    {/* Details Section */}
                    <View style={styles.detailsContainer}>
                        <View style={styles.headerRow}>
                            <View style={styles.companyInfo}>
                                <Text style={styles.companyName}>{offer.name}</Text>
                                <View style={styles.ratingRow}>
                                    <MaterialIcons name="star" size={16} color={COLORS.primary} />
                                    <Text style={styles.ratingValue}>{offer.rating}</Text>
                                    <Text style={styles.reviewCount}>({offer.reviewCount})</Text>
                                </View>
                            </View>
                            {/* Verified Badge */}
                            {offer.verified && (
                                <MaterialIcons name="verified" size={18} color="#3b82f6" />
                            )}
                        </View>

                        {/* Price and Duration */}
                        <View style={styles.priceSection}>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceAmount}>{offer.price}</Text>
                                <Text style={styles.priceCurrency}>ر.س / يوم</Text>
                            </View>
                            <View style={styles.durationBadge}>
                                <Text style={styles.durationText}>لمدة {offer.duration} أيام</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionSection}>
                    <TouchableOpacity style={styles.rejectButton}>
                        <Text style={styles.rejectButtonText}>رفض</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => navigation.navigate('NegotiationChat', { offer })}
                    >
                        <Text style={styles.acceptButtonText}>قبول والتفاوض</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>لوحة العروض</Text>
                    <View style={{ width: 40 }} />
                </View>
            </SafeAreaView>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Offers Count */}
                <Text style={styles.offersCountText}>
                    وصلك <Text style={styles.offersCountNumber}>3</Text> عروض حتى الآن
                </Text>

                {/* Search Animation Section */}
                <View style={styles.searchSection}>
                    <Animated.View style={[
                        styles.searchIconContainer,
                        { transform: [{ scale: searchAnimation }] }
                    ]}>
                        <View style={styles.searchIconBackground}>
                            <MaterialIcons name="search" size={28} color="white" />
                        </View>
                    </Animated.View>
                    <Text style={styles.searchText}>جاري البحث عن أفضل الشركات القريبة منك...</Text>
                </View>

                {/* Offers List */}
                <View style={styles.offersList}>
                    {OFFERS.map((offer) => renderOfferCard(offer))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 56,
    },
    backButton: {
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
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    offersCountText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 8,
        lineHeight: 32,
    },
    offersCountNumber: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    searchSection: {
        alignItems: 'center',
        paddingVertical: 32,
        gap: 16,
    },
    searchIconContainer: {
        width: 96,
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIconBackground: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    searchText: {
        fontSize: 14,
        color: COLORS.textGray,
        textAlign: 'center',
        paddingHorizontal: 24,
    },
    offersList: {
        gap: 16,
        marginTop: 16,
    },
    offerCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    cardContent: {
        flexDirection: 'row',
        gap: 16,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
    },
    companyImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
    },
    companyInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    ratingValue: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    reviewCount: {
        fontSize: 12,
        color: '#9ca3af',
    },
    priceSection: {
        marginTop: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    priceAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    priceCurrency: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    durationBadge: {
        backgroundColor: '#f9fafb',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    durationText: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    actionSection: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f9fafb',
    },
    rejectButton: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surfaceLight,
    },
    rejectButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    acceptButton: {
        flex: 2,
        height: 40,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    acceptButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#181611',
    },
});
