import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
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
    green: '#22c55e',
    amber: '#f59e0b',
};

export default function FleetManagementScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.menuButton}>
                        <MaterialIcons name="menu" size={24} color={COLORS.textLight} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>إدارة الأسطول</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>الكل</Text>
                        <Text style={styles.statValue}>15</Text>
                    </View>
                    <View style={[styles.statCard, styles.statCardHighlight]}>
                        <Text style={styles.statLabelHighlight}>مؤجر</Text>
                        <Text style={styles.statValueHighlight}>10</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statLabel, { color: COLORS.green }]}>متاح</Text>
                        <Text style={[styles.statValue, { color: COLORS.green }]}>5</Text>
                    </View>
                </View>

                <View style={styles.machineCard}>
                    <View style={styles.machineImage} />
                    <View style={styles.machineInfo}>
                        <Text style={styles.machineName}>حفارة كاتربيلر 320</Text>
                        <Text style={styles.priceValue}>1500 <Text style={styles.priceCurrency}>ر.س</Text></Text>
                    </View>
                </View>

                <View style={styles.machineCard}>
                    <View style={styles.machineImage} />
                    <View style={styles.machineInfo}>
                        <Text style={styles.machineName}>رافعة تادانو 50 طن</Text>
                        <Text style={styles.priceValue}>2200 <Text style={styles.priceCurrency}>ر.س</Text></Text>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddMachine')}>
                <MaterialIcons name="add" size={24} color={COLORS.primaryContent} />
                <Text style={styles.fabText}>إضافة معدة</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.backgroundLight },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: COLORS.surfaceLight },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    menuButton: { padding: 8, marginRight: 12 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textLight },
    scrollView: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 100 },
    statsContainer: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    statCard: { flex: 1, backgroundColor: COLORS.surfaceLight, borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.borderLight },
    statCardHighlight: { backgroundColor: 'rgba(236, 200, 19, 0.1)', borderColor: 'rgba(236, 200, 19, 0.2)' },
    statLabel: { fontSize: 14, color: COLORS.subtextLight, marginBottom: 4 },
    statLabelHighlight: { fontSize: 14, color: '#92400e', marginBottom: 4 },
    statValue: { fontSize: 24, fontWeight: 'bold', color: COLORS.textLight },
    statValueHighlight: { fontSize: 24, fontWeight: 'bold', color: '#78350f' },
    machineCard: { backgroundColor: COLORS.surfaceLight, borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
    machineImage: { width: '100%', height: 150, backgroundColor: '#e5e7eb' },
    machineInfo: { padding: 12 },
    machineName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textLight, textAlign: 'right', marginBottom: 8 },
    priceValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textLight },
    priceCurrency: { fontSize: 12, fontWeight: 'normal', color: COLORS.subtextLight },
    fab: { position: 'absolute', bottom: 24, left: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12 },
    fabText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primaryContent, marginLeft: 8 },
});
