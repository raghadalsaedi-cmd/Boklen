import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { NotoSansArabic_400Regular, NotoSansArabic_500Medium, NotoSansArabic_600SemiBold, NotoSansArabic_700Bold } from '@expo-google-fonts/noto-sans-arabic';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CompanyInfoScreen from './screens/CompanyInfoScreen';
import RepInfoScreen from './screens/RepInfoScreen';
import UploadDocsScreen from './screens/UploadDocsScreen';
import VerificationPendingScreen from './screens/VerificationPendingScreen';
import FleetManagementScreen from './screens/FleetManagementScreen';
import AddMachineScreen from './screens/AddMachineScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    NotoSansArabic_400Regular,
    NotoSansArabic_500Medium,
    NotoSansArabic_600SemiBold,
    NotoSansArabic_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CompanyInfo" component={CompanyInfoScreen} />
        <Stack.Screen name="RepInfo" component={RepInfoScreen} />
        <Stack.Screen name="UploadDocs" component={UploadDocsScreen} />
        <Stack.Screen name="VerificationPending" component={VerificationPendingScreen} />
        <Stack.Screen name="FleetManagement" component={FleetManagementScreen} />
        <Stack.Screen name="AddMachine" component={AddMachineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
