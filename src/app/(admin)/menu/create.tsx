import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/types'
import Colors from '@/src/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';

import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<string | null>(null);

    const { id } = useLocalSearchParams()
    const isUpdating = !!id

    const [errors, setErrors] = useState('')

    const resetFields = () => {
        setName('')
        setPrice('')
    }

    const validateInput = () => {
        setErrors('')
        if (!name) {
            setErrors("Name is required")
            return false
        }

        if (!price) {
            setErrors("Price is required")
            return false
        }

        if (isNaN(parseFloat(price))) {
            setErrors("Price is not a number")
            return false
        }

        return true
    }

    const onSubmit = () => {
        if (isUpdating) {
            // update
            onUpdateCreate()
        } else {
            onCreate()
        }
    }

    const onUpdateCreate = () => {
        if (!validateInput()) {
            return;
        }

        // save to db

        resetFields()
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        resetFields()
    }

    const confirmDelete = () => { 
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            {
                text: "Cancel",
            }, {
                text: "Delete",
                style: "destructive",
                onPress: onDelete
            }
        ])
    }

    const onDelete = () => { }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? "Update Product" : "Create Product" }} />

            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder='name'
                style={styles.input}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
            />

            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.deleteText}>Delete</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10
    },
    deleteText: { 
        color: 'red', 
        alignSelf: 'center', 
        marginTop: 10, 
        fontWeight: 'bold' 
    }
})

export default CreateProductScreen