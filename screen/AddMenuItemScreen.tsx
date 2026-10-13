import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMenuItem'> & {
    onAddItem: (item: MenuItem) => void;
};

export default function AddMenuItemScreen({ navigation, onAddItem }: Props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('');
    const [price, setPrice] = useState('');


    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [courseError, setCourseError] = useState('');
    const [priceError, setPriceError] = useState('');

    const validateForm = (): boolean => {
        let valid = true;

        if (name.trim() === '') {
            setNameError('Please enter the dish name.');
            valid = false;
        } else {
            setNameError('');
        }

        if (description.trim() === '') {
            setDescriptionError('Please enter the dish description.');
            valid = false;
        } else {
            setDescriptionError('');
        }

        if (course === '') {
            setCourseError('Please select a course.');
            valid = false;
        } else {
            setCourseError('');
        }

        const priceNumber = parseFloat(price);
        if (price.trim() === '') {
            setPriceError('Please enter the dish price.');
            valid = false;
        } else if (isNaN(priceNumber) || priceNumber <= 0) {
            setPriceError('Please enter a valid number greater than 0.');
            valid = false;
        } else {
            setPriceError('');
        }

        return valid;
    };

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }

        const newItem: MenuItem = {
            id: Date.now().toString(),
            name: name.trim(),
            description: description.trim(),
            course: course,
            price: parseFloat(price),
        };

        onAddItem(newItem);

        setName('');
        setDescription('');
        setCourse('');
        setPrice('');

        Alert.alert('Success', `"${newItem.name}" was added to the menu.`, [
            { text: 'Ok', onPress: () => navigation.navigate('Home') },
        ]);
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.label}>Dish Name</Text>
            <TextInput
                style={[styles.input, nameError !== '' && styles.inputError]}
                placeholder="for e.g. Bobotie"
                value={name}
                onChangeText={setName}
            />
            {nameError !== '' && <Text style={styles.errorText}>{nameError}</Text>}

            <Text style={styles.label}>Dish Description</Text>
            <TextInput
                style={[
                styles.input,
                styles.multiline,
                descriptionError !== '' && styles.inputError
                ]}
                placeholder="for e.g. A traditional South African dish made with spiced mince bake"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
            />
            {descriptionError !== '' && (
                <Text style={styles.errorText}>{descriptionError}</Text>
            )}

            <Text style={styles.label}>Course</Text>
            <View style={[styles.pickerContainer, courseError !== '' && styles.inputError]}
            >
                <Picker
                    selectedValue={course}
                    onValueChange={(value: string) => setCourse(value)}
                >
                    <Picker.Item label="Select a course (Stater / Main / Dessert)" value="" />
                    <Picker.Item label="Starter" value="Starter" />
                    <Picker.Item label="Main" value="Main Course" />
                    <Picker.Item label="Dessert" value="Dessert" />
                </Picker>
            </View>
            {courseError !== '' && (
                <Text style={styles.errorText}>{courseError}</Text>
            )}

            <Text style={styles.label}>Price (R)</Text>
            <TextInput
                style={[styles.input, priceError !== '' && styles.inputError]}
                placeholder="for e.g. 145.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            {priceError !== '' && (
                <Text style={styles.errorText}>{priceError}</Text>
            )}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Menu Item</Text>
                </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 16,
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#D9D9D9',
        borderRadius: 6,    
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    multiline: {
        height: 90,
    },
    pickerBox: {
        backgroundColor: '#D9D9D9',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputError: {
        borderColor: '#D32F2F',
    },
    errorText: {
        color: '#D32F2F',
        fontSize: 14,
        marginTop: 4,
    },
    saveButton: {
        backgroundColor: '#34C759',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },  
});
            
        
    
