import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ebc024',
    backgroundLight: '#FAFAFA',
    surfaceLight: '#FFFFFF',
    textDark: '#212121',
    textGray: '#757575',
    border: '#EEEEEE',
};

export default function NegotiationChatScreen({ navigation, route }) {
    const { offer } = route.params || {};
    const [messageText, setMessageText] = useState('');
    const scrollViewRef = useRef(null);

    // Mock chat data
    const messages = [
        {
            id: 1,
            type: 'system',
            text: 'بدأت المفاوضة - ١٠ أكتوبر ٢٠٢٣',
        },
        {
            id: 2,
            type: 'user',
            text: 'مرحباً، هل السعر قابل للتفاوض؟ أرغب في استئجارها لمدة أسبوع كامل للعمل في موقع بالرياض.',
            time: '١٠:٣٠ ص',
            read: true,
        },
        {
            id: 3,
            type: 'company',
            text: 'أهلاً بك. نعم، يمكننا تقديم سعر خاص للفترات الطويلة. كم ميزانيتك المقترحة؟',
            time: '١٠:٣٥ ص',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgKdnKpwFi8ucnKplO0G7RTFEpagUKlm04HmLTuUYCVu5-MbScSAdYjXaioUFiTcKPplHR58H-H2LjzTKfUgntwgD6ikS7CmMZkoRXrSrI7LJFyv71sYntyfVQ4_rzldaqEsS5JV5-j5buJ69zG8Z9QXw5Xp4XPtxQy1BRoE1-ik56dmt_8lraY_v1JMVam8rpkB2D4i8O4mQtaLGbVvt0MfB8xihxS-rsyFuE-WtTIabsITzHGxSooPFhbq9ct9p5yHEC6Lw-JgIi',
        },
        {
            id: 4,
            type: 'user',
            text: 'ميزانيتي هي ٤٥٠ ريال لليوم.',
            time: '١٠:٣٦ ص',
            read: true,
        },
        {
            id: 5,
            type: 'priceCard',
            oldPrice: 500,
            newPrice: 450,
            time: '١٠:٤٠ ص',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUe4rs3DWmEjgU2Fw3Ecvc7vx6HuG6dmeyuZNWdjWWuwqdFLx-vF7lHlfgB6OfkA2SiAC6IVxqFeOQoW6IVXmhSEBInrQzt98SUY4ucIZKcWPGUOUTl2pJbNYME7PKQpW3Uf9SOgfjFlbQI1fn8mkVLdNXqj4KaCCnkps59oNWMMK_4zAqzuIVPqCYItHhuHIBsvV9CtC2F8XK8VbnXJbg1Lx17h9gD4Dec8jHPQ-gvYy9fG1DfZgJcvVNSbn-tK-JIxWAxqPOkAcD',
        },
    ];

    const renderMessage = (message) => {
        if (message.type === 'system') {
            return (
                <View key={message.id} style={styles.systemMessageContainer}>
                    <View style={styles.systemMessage}>
                        <Text style={styles.systemMessageText}>{message.text}</Text>
                    </View>
                </View>
            );
        }

        if (message.type === 'user') {
            return (
                <View key={message.id} style={styles.userMessageContainer}>
                    <View style={styles.userMessageWrapper}>
                        <View style={styles.userMessageBubble}>
                            <Text style={styles.userMessageText}>{message.text}</Text>
                        </View>
                        <View style={styles.userMessageFooter}>
                            <MaterialIcons name="done-all" size={14} color={COLORS.primary} />
                            <Text style={styles.messageTime}>{message.time}</Text>
                        </View>
                    </View>
                </View>
            );
        }

        if (message.type === 'company') {
            return (
                <View key={message.id} style={styles.companyMessageContainer}>
                    <Image source={{ uri: message.avatar }} style={styles.companyAvatar} />
                    <View style={styles.companyMessageWrapper}>
                        <View style={styles.companyMessageBubble}>
                            <Text style={styles.companyMessageText}>{message.text}</Text>
                        </View>
                        <Text style={styles.messageTime}>{message.time}</Text>
                    </View>
                </View>
            );
        }

        if (message.type === 'priceCard') {
            return (
                <View key={message.id} style={styles.companyMessageContainer}>
                    <Image source={{ uri: message.avatar }} style={styles.companyAvatar} />
                    <View style={styles.priceCardWrapper}>
                        <View style={styles.priceCard}>
                            <View style={styles.priceCardHeader}>
                                <MaterialIcons name="local-offer" size={20} color={COLORS.primary} />
                                <Text style={styles.priceCardHeaderText}>عرض سعر جديد</Text>
                            </View>
                            <View style={styles.priceCardBody}>
                                <Text style={styles.priceCardDescription}>
                                    بناءً على طلبك، قمنا بتحديث عرض السعر.
                                </Text>
                                <View style={styles.priceComparisonContainer}>
                                    <View style={styles.oldPriceSection}>
                                        <Text style={styles.oldPriceAmount}>{message.oldPrice} ر.س</Text>
                                        <Text style={styles.oldPriceLabel}>السعر السابق</Text>
                                    </View>
                                    <MaterialIcons name="arrow-back" size={20} color="#9ca3af" />
                                    <View style={styles.newPriceSection}>
                                        <Text style={styles.newPriceAmount}>{message.newPrice} ر.س</Text>
                                        <Text style={styles.newPriceLabel}>سعر محدث</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.acceptPriceButton}
                                    onPress={() => navigation.navigate('OrderConfirmation', {
                                        equipment: 'Dozer CAT D9',
                                        price: message.newPrice,
                                        duration: 3
                                    })}
                                >
                                    <MaterialIcons name="check-circle" size={20} color={COLORS.textDark} />
                                    <Text style={styles.acceptPriceButtonText}>اعتماد السعر النهائي</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.messageTime}>{message.time}</Text>
                    </View>
                </View>
            );
        }

        return null;
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>مفاوضات التأجير</Text>
                    </View>
                    <TouchableOpacity style={styles.menuButton}>
                        <MaterialIcons name="more-vert" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                </View>

                {/* Equipment Summary Card */}
                <View style={styles.equipmentCard}>
                    <View style={styles.equipmentImage}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMez4mLQqh6-Jylw5lz31WCuhH7IsPTScAfVErEo5q2uyj-f6aUa5ukPv0a1p-DwnZljyaKclpdw7o-9ttNx_nxn4XMjBHZM6v5EkjI7GAPcVaM8zIaQ8sAKJubtQd1_f0xhjXVR_gBcLUt0TOlYaQhAutmUGGT-j_0He4NTQlp6gZdlIu1IuhcCQHRJ9F1XySi4usWsGAbgBVU91GnfdqXA6WGJro8QefDnFyRiIabRaoWg2ROHlpGFVw0S_xNAsdaiAU2zXpGRpp' }}
                            style={styles.equipmentImageInner}
                        />
                    </View>
                    <View style={styles.equipmentDetails}>
                        <Text style={styles.equipmentName}>حفارة كاتربيلر ٣٢٠</Text>
                        <View style={styles.equipmentMeta}>
                            <Text style={styles.equipmentMetaText}>٥٠٠ ر.س / يوم</Text>
                            <View style={styles.metaDot} />
                            <Text style={styles.equipmentMetaText}>لمدة أسبوع</Text>
                        </View>
                    </View>
                    <View style={styles.initialPriceBadge}>
                        <Text style={styles.initialPriceBadgeText}>السعر المبدئي</Text>
                    </View>
                </View>
            </SafeAreaView>

            {/* Chat Messages */}
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map(renderMessage)}
            </ScrollView>

            {/* Input Area */}
            <SafeAreaView edges={['bottom']} style={styles.inputArea}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton}>
                        <MaterialIcons name="add-circle-outline" size={28} color={COLORS.textGray} />
                    </TouchableOpacity>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="اكتب رسالتك..."
                            placeholderTextColor={COLORS.textGray}
                            value={messageText}
                            onChangeText={setMessageText}
                            multiline
                        />
                        <TouchableOpacity style={styles.micButton}>
                            <MaterialIcons name="mic" size={20} color={COLORS.textGray} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.sendButton}>
                        <MaterialIcons name="send" size={20} color={COLORS.textDark} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        backgroundColor: COLORS.surfaceLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    menuButton: {
        padding: 8,
        marginRight: -8,
        borderRadius: 20,
    },
    equipmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#f9fafb',
        margin: 16,
        marginTop: 8,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    equipmentImage: {
        width: 48,
        height: 48,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#e5e7eb',
    },
    equipmentImageInner: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    equipmentDetails: {
        flex: 1,
        minWidth: 0,
    },
    equipmentName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 2,
    },
    equipmentMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    equipmentMetaText: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    metaDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#d1d5db',
    },
    initialPriceBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    initialPriceBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 24,
        gap: 24,
    },
    systemMessageContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    systemMessage: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f3f4f6',
        borderRadius: 16,
    },
    systemMessageText: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    userMessageContainer: {
        alignItems: 'flex-start',
        marginVertical: 4,
    },
    userMessageWrapper: {
        maxWidth: '80%',
        alignItems: 'flex-start',
    },
    userMessageBubble: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        borderTopRightRadius: 4,
    },
    userMessageText: {
        fontSize: 14,
        color: COLORS.textDark,
        fontWeight: '500',
        lineHeight: 20,
    },
    userMessageFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
        paddingHorizontal: 4,
    },
    companyMessageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        marginVertical: 4,
        justifyContent: 'flex-end',
    },
    companyAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e5e7eb',
        borderWidth: 2,
        borderColor: COLORS.surfaceLight,
    },
    companyMessageWrapper: {
        maxWidth: '80%',
        alignItems: 'flex-end',
    },
    companyMessageBubble: {
        backgroundColor: COLORS.surfaceLight,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        borderTopLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    companyMessageText: {
        fontSize: 14,
        color: COLORS.textDark,
        lineHeight: 20,
    },
    messageTime: {
        fontSize: 10,
        color: COLORS.textGray,
        marginTop: 4,
        paddingHorizontal: 4,
    },
    priceCardWrapper: {
        maxWidth: '85%',
        width: 320,
        alignItems: 'flex-end',
    },
    priceCard: {
        width: '100%',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        borderTopLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    priceCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(235, 192, 36, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(235, 192, 36, 0.1)',
    },
    priceCardHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    priceCardBody: {
        padding: 16,
        gap: 12,
    },
    priceCardDescription: {
        fontSize: 14,
        color: COLORS.textDark,
        lineHeight: 20,
    },
    priceComparisonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.backgroundLight,
        padding: 12,
        borderRadius: 8,
    },
    oldPriceSection: {
        alignItems: 'flex-start',
    },
    oldPriceAmount: {
        fontSize: 12,
        color: COLORS.textGray,
        textDecorationLine: 'line-through',
    },
    oldPriceLabel: {
        fontSize: 12,
        color: COLORS.textGray,
        marginTop: 2,
    },
    newPriceSection: {
        alignItems: 'flex-end',
    },
    newPriceAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    newPriceLabel: {
        fontSize: 12,
        color: '#16a34a',
        fontWeight: '500',
        marginTop: 2,
    },
    acceptPriceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    acceptPriceButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    inputArea: {
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    attachButton: {
        padding: 8,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 24,
        paddingHorizontal: 16,
        minHeight: 48,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textDark,
        paddingVertical: 12,
        maxHeight: 100,
    },
    micButton: {
        padding: 4,
        marginLeft: 8,
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
});
