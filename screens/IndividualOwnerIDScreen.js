import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform, Modal, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const COLORS = {
    primary: '#EBC024',
    backgroundLight: '#FAFAFA',
    surfaceLight: '#FFFFFF',
    textLight: '#1e293b',
    textDark: '#212121',
    subtext: '#757575',
    border: '#e2e8f0',
    placeholderGray: '#BDBDBD',
    error: '#ef4444',
};

export default function IndividualOwnerIDScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Photo upload states
    const [frontIdFile, setFrontIdFile] = useState(null);
    const [backIdFile, setBackIdFile] = useState(null);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [currentUploadType, setCurrentUploadType] = useState(null); // 'front' or 'back'

    // Validation errors
    const [errors, setErrors] = useState({
        fullName: '',
        idNumber: '',
        birthDate: '',
        frontId: '',
        backId: '',
    });
    const [touched, setTouched] = useState({
        fullName: false,
        idNumber: false,
        birthDate: false,
        frontId: false,
        backId: false,
    });

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    const validateAge = (date) => {
        const age = calculateAge(date);
        if (age < 18) {
            return 'يجب أن يكون عمرك 18 سنة أو أكثر';
        }
        return '';
    };

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
            if (selectedDate) {
                setBirthDate(selectedDate);
                setTouched(prev => ({ ...prev, birthDate: true }));
                setErrors(prev => ({ ...prev, birthDate: validateAge(selectedDate) }));
            }
        } else {
            // On iOS, update the temp date as user scrolls
            if (selectedDate) {
                setBirthDate(selectedDate);
            }
        }
    };

    const confirmDateSelection = () => {
        setShowDatePicker(false);
        setTouched(prev => ({ ...prev, birthDate: true }));
        setErrors(prev => ({ ...prev, birthDate: validateAge(birthDate) }));
    };

    const validateFullName = (name) => {
        if (!name || name.trim() === '') {
            return 'يرجى إدخال الاسم الكامل';
        }
        if (name.trim().length < 3) {
            return 'الاسم يجب أن يكون 3 أحرف على الأقل';
        }
        return '';
    };

    const validateIdNumber = (id) => {
        if (!id || id.trim() === '') {
            return 'يرجى إدخال رقم الهوية';
        }
        if (id.length !== 10) {
            return 'رقم الهوية يجب أن يكون 10 أرقام';
        }
        if (!/^\d+$/.test(id)) {
            return 'رقم الهوية يجب أن يحتوي على أرقام فقط';
        }
        return '';
    };

    const handleFullNameChange = (text) => {
        setFullName(text);
        if (touched.fullName) {
            setErrors(prev => ({ ...prev, fullName: validateFullName(text) }));
        }
    };

    const handleIdNumberChange = (text) => {
        setIdNumber(text);
        if (touched.idNumber) {
            setErrors(prev => ({ ...prev, idNumber: validateIdNumber(text) }));
        }
    };

    const handleFullNameBlur = () => {
        setTouched(prev => ({ ...prev, fullName: true }));
        setErrors(prev => ({ ...prev, fullName: validateFullName(fullName) }));
    };

    const handleIdNumberBlur = () => {
        setTouched(prev => ({ ...prev, idNumber: true }));
        setErrors(prev => ({ ...prev, idNumber: validateIdNumber(idNumber) }));
    };

    const handleContinue = () => {
        // Validate all fields
        const newErrors = {
            fullName: validateFullName(fullName),
            idNumber: validateIdNumber(idNumber),
            birthDate: validateAge(birthDate),
            // Temporarily disabled ID photo validation
            // frontId: !frontIdFile ? 'يرجى رفع صورة الهوية من الأمام' : '',
            // backId: !backIdFile ? 'يرجى رفع صورة الهوية من الخلف' : '',
            frontId: '',
            backId: '',
        };

        setErrors(newErrors);
        setTouched({
            fullName: true,
            idNumber: true,
            birthDate: true,
            frontId: true,
            backId: true,
        });

        // Check if any errors exist
        const hasErrors = Object.values(newErrors).some(error => error !== '');

        if (!hasErrors) {
            // Navigate to Fleet Management screen
            console.log('Continue with individual owner data');
            navigation.navigate('FleetManagement', {
                ownerData: {
                    fullName,
                    idNumber,
                    birthDate: formatDate(birthDate),
                    frontIdFile,
                    backIdFile,
                }
            });
        }
    };

    const handleUploadPhoto = (type) => {
        setCurrentUploadType(type);
        setShowActionSheet(true);
    };

    const requestCameraPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('خطأ', 'نحتاج إلى إذن الكاميرا للمتابعة');
            return false;
        }
        return true;
    };

    const requestMediaLibraryPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('خطأ', 'نحتاج إلى إذن الوصول للمعرض للمتابعة');
            return false;
        }
        return true;
    };

    const handleTakePhoto = async () => {
        setShowActionSheet(false);

        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const file = {
                uri: result.assets[0].uri,
                type: 'image',
                name: `ID_${currentUploadType}_${Date.now()}.jpg`,
            };

            if (currentUploadType === 'front') {
                setFrontIdFile(file);
                setErrors(prev => ({ ...prev, frontId: '' }));
            } else {
                setBackIdFile(file);
                setErrors(prev => ({ ...prev, backId: '' }));
            }
        }
    };

    const handleChooseFromGallery = async () => {
        setShowActionSheet(false);

        const hasPermission = await requestMediaLibraryPermission();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const file = {
                uri: result.assets[0].uri,
                type: 'image',
                name: `ID_${currentUploadType}_${Date.now()}.jpg`,
            };

            if (currentUploadType === 'front') {
                setFrontIdFile(file);
                setErrors(prev => ({ ...prev, frontId: '' }));
            } else {
                setBackIdFile(file);
                setErrors(prev => ({ ...prev, backId: '' }));
            }
        }
    };

    const handleChooseFile = async () => {
        setShowActionSheet(false);

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                const file = {
                    uri: asset.uri,
                    type: asset.mimeType.startsWith('image/') ? 'image' : 'pdf',
                    name: asset.name,
                };

                if (currentUploadType === 'front') {
                    setFrontIdFile(file);
                    setErrors(prev => ({ ...prev, frontId: '' }));
                } else {
                    setBackIdFile(file);
                    setErrors(prev => ({ ...prev, backId: '' }));
                }
            }
        } catch (error) {
            console.error('Error picking document:', error);
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
                <Text style={styles.headerTitle}>بيانات المالك الفرد</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressStep} />
                    <View style={[styles.progressStep, styles.progressStepActive]} />
                    <View style={styles.progressStep} />
                </View>

                {/* Personal Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>البيانات الشخصية</Text>

                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>الاسم الكامل</Text>
                        <View style={[
                            styles.inputContainer,
                            errors.fullName && touched.fullName && styles.inputContainerError
                        ]}>
                            <MaterialIcons name="person" size={20} color={COLORS.placeholderGray} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="أدخل اسمك الكامل"
                                placeholderTextColor={COLORS.placeholderGray}
                                value={fullName}
                                onChangeText={handleFullNameChange}
                                onBlur={handleFullNameBlur}
                                textAlign="right"
                            />
                        </View>
                        {errors.fullName && touched.fullName && (
                            <Text style={styles.errorText}>{errors.fullName}</Text>
                        )}
                    </View>

                    {/* ID/Residence Number */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>رقم الهوية / الإقامة</Text>
                        <View style={[
                            styles.inputContainer,
                            errors.idNumber && touched.idNumber && styles.inputContainerError
                        ]}>
                            <MaterialIcons name="badge" size={20} color={COLORS.placeholderGray} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="0000000000"
                                placeholderTextColor={COLORS.placeholderGray}
                                value={idNumber}
                                onChangeText={handleIdNumberChange}
                                onBlur={handleIdNumberBlur}
                                keyboardType="numeric"
                                maxLength={10}
                                textAlign="right"
                            />
                        </View>
                        {errors.idNumber && touched.idNumber && (
                            <Text style={styles.errorText}>{errors.idNumber}</Text>
                        )}
                    </View>

                    {/* Birth Date */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>تاريخ الميلاد</Text>
                        <TouchableOpacity
                            style={[
                                styles.inputContainer,
                                errors.birthDate && touched.birthDate && styles.inputContainerError
                            ]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <MaterialIcons name="calendar-today" size={20} color={COLORS.placeholderGray} style={styles.inputIcon} />
                            <Text style={styles.dateText}>{formatDate(birthDate)}</Text>
                        </TouchableOpacity>
                        {errors.birthDate && touched.birthDate && (
                            <Text style={styles.errorText}>{errors.birthDate}</Text>
                        )}
                    </View>

                    {/* iOS Date Picker Modal */}
                    {showDatePicker && Platform.OS === 'ios' && (
                        <Modal
                            transparent={true}
                            animationType="slide"
                            visible={showDatePicker}
                            onRequestClose={() => setShowDatePicker(false)}
                        >
                            <View style={styles.datePickerModalOverlay}>
                                <View style={styles.datePickerModal}>
                                    <View style={styles.datePickerHeader}>
                                        <TouchableOpacity onPress={confirmDateSelection}>
                                            <Text style={styles.datePickerDoneButton}>تم</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.datePickerTitle}>اختر تاريخ الميلاد</Text>
                                    </View>
                                    <DateTimePicker
                                        value={birthDate}
                                        mode="date"
                                        display="spinner"
                                        onChange={handleDateChange}
                                        maximumDate={new Date()}
                                        textColor={COLORS.textDark}
                                    />
                                </View>
                            </View>
                        </Modal>
                    )}

                    {/* Android Date Picker */}
                    {showDatePicker && Platform.OS === 'android' && (
                        <DateTimePicker
                            value={birthDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}
                </View>

                {/* ID Verification Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>التحقق من الهوية</Text>
                    <Text style={styles.sectionSubtitle}>يُرجى إرفاق صورة الهوية من الأمام والخلف</Text>

                    <View style={styles.photoUploadContainer}>
                        {/* Front ID Photo */}
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={[
                                    styles.photoUploadBox,
                                    frontIdFile && styles.photoUploadBoxUploaded,
                                    errors.frontId && touched.frontId && styles.photoUploadBoxError
                                ]}
                                onPress={() => handleUploadPhoto('front')}
                            >
                                {frontIdFile ? (
                                    <>
                                        {frontIdFile.type === 'image' ? (
                                            <Image source={{ uri: frontIdFile.uri }} style={styles.uploadedImage} />
                                        ) : (
                                            <MaterialIcons name="picture-as-pdf" size={40} color={COLORS.primary} />
                                        )}
                                        <View style={styles.checkmarkBadge}>
                                            <MaterialIcons name="check-circle" size={24} color={COLORS.primary} />
                                        </View>
                                        <Text style={styles.uploadedFileName} numberOfLines={1}>
                                            {frontIdFile.name}
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <MaterialIcons name="camera-alt" size={40} color={COLORS.primary} />
                                        <Text style={styles.photoUploadText}>
                                            صورة الهوية (أمام)
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            {errors.frontId && touched.frontId && (
                                <Text style={styles.errorText}>{errors.frontId}</Text>
                            )}
                        </View>

                        {/* Back ID Photo */}
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={[
                                    styles.photoUploadBox,
                                    backIdFile && styles.photoUploadBoxUploaded,
                                    errors.backId && touched.backId && styles.photoUploadBoxError
                                ]}
                                onPress={() => handleUploadPhoto('back')}
                            >
                                {backIdFile ? (
                                    <>
                                        {backIdFile.type === 'image' ? (
                                            <Image source={{ uri: backIdFile.uri }} style={styles.uploadedImage} />
                                        ) : (
                                            <MaterialIcons name="picture-as-pdf" size={40} color={COLORS.primary} />
                                        )}
                                        <View style={styles.checkmarkBadge}>
                                            <MaterialIcons name="check-circle" size={24} color={COLORS.primary} />
                                        </View>
                                        <Text style={styles.uploadedFileName} numberOfLines={1}>
                                            {backIdFile.name}
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <MaterialIcons name="camera-alt" size={40} color={COLORS.primary} />
                                        <Text style={styles.photoUploadText}>
                                            صورة الهوية (خلف)
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            {errors.backId && touched.backId && (
                                <Text style={styles.errorText}>{errors.backId}</Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Security Note */}
                <View style={styles.securityNote}>
                    <MaterialIcons name="lock" size={16} color={COLORS.subtext} />
                    <Text style={styles.securityText}>بياناتك مشفرة وآمنة</Text>
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleContinue}
                >
                    <Text style={styles.primaryButtonText}>متابعة</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Action Sheet Modal */}
            <Modal
                visible={showActionSheet}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowActionSheet(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowActionSheet(false)}
                >
                    <View style={styles.actionSheet}>
                        <View style={styles.actionSheetHandle} />
                        <Text style={styles.actionSheetTitle}>اختر طريقة الرفع</Text>

                        <TouchableOpacity
                            style={styles.actionSheetOption}
                            onPress={handleTakePhoto}
                        >
                            <MaterialIcons name="camera-alt" size={24} color={COLORS.textDark} />
                            <Text style={styles.actionSheetOptionText}>التقاط صورة</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionSheetOption}
                            onPress={handleChooseFromGallery}
                        >
                            <MaterialIcons name="photo-library" size={24} color={COLORS.textDark} />
                            <Text style={styles.actionSheetOptionText}>اختيار من المعرض</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionSheetOption}
                            onPress={handleChooseFile}
                        >
                            <MaterialIcons name="insert-drive-file" size={24} color={COLORS.textDark} />
                            <Text style={styles.actionSheetOptionText}>اختيار ملف</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionSheetCancel}
                            onPress={() => setShowActionSheet(false)}
                        >
                            <Text style={styles.actionSheetCancelText}>إلغاء</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 24,
        width: '100%',
    },
    progressStep: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.border,
    },
    progressStepActive: {
        backgroundColor: COLORS.primary,
    },
    section: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'flex-end',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 16,
        textAlign: 'right',
        width: '100%',
        alignSelf: 'flex-end',
    },
    sectionSubtitle: {
        fontSize: 14,
        color: COLORS.subtext,
        marginBottom: 16,
        textAlign: 'right',
        width: '100%',
        alignSelf: 'flex-end',
    },
    inputGroup: {
        marginBottom: 16,
        width: '100%',
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textDark,
        marginBottom: 8,
        textAlign: 'right',
        width: '100%',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 16,
        height: 56,
    },
    inputContainerError: {
        borderColor: COLORS.error,
        borderWidth: 1.5,
    },
    inputIcon: {
        marginLeft: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textDark,
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    dateText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textDark,
        textAlign: 'right',
    },
    errorText: {
        fontSize: 12,
        color: COLORS.error,
        marginTop: 4,
        textAlign: 'right',
        width: '100%',
        alignSelf: 'flex-end',
    },
    photoUploadContainer: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
        width: '100%',
    },
    photoUploadBox: {
        aspectRatio: 1.2,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    photoUploadBoxError: {
        borderColor: COLORS.error,
    },
    photoUploadText: {
        fontSize: 12,
        color: COLORS.subtext,
        textAlign: 'center',
        marginTop: 8,
    },
    photoUploadBoxUploaded: {
        borderColor: COLORS.primary,
        borderStyle: 'solid',
        backgroundColor: COLORS.surfaceLight,
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        position: 'absolute',
    },
    checkmarkBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
    },
    uploadedFileName: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        right: 8,
        fontSize: 10,
        color: COLORS.textDark,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    actionSheet: {
        backgroundColor: COLORS.surfaceLight,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 8,
    },
    actionSheetHandle: {
        width: 40,
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    actionSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'right',
        marginBottom: 16,
    },
    actionSheetOption: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 12,
        marginBottom: 12,
    },
    actionSheetOptionText: {
        fontSize: 16,
        color: COLORS.textDark,
        marginRight: 12,
        flex: 1,
        textAlign: 'right',
    },
    actionSheetCancel: {
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    actionSheetCancelText: {
        fontSize: 16,
        color: COLORS.error,
        fontWeight: '600',
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 16,
    },
    securityText: {
        fontSize: 12,
        color: COLORS.subtext,
    },
    primaryButton: {
        width: '100%',
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    datePickerModalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    datePickerModal: {
        backgroundColor: COLORS.surfaceLight,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 20,
    },
    datePickerHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    datePickerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    datePickerDoneButton: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary,
    },
    primaryButtonText: {
        color: COLORS.textDark,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
