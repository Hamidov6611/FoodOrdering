import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/types'
import Colors from '@/src/constants/Colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products';

const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const { id } = useLocalSearchParams()
    const isUpdating = !!id

    const router = useRouter()

    const { mutate: insertProduct } = useInsertProduct()
    const { mutate: updateProduct } = useUpdateProduct()
    const { mutate: deleteProduct } = useDeleteProduct()
    const { data: updatingProduct } = useProduct(parseInt(id as string))

    const [errors, setErrors] = useState('')

    useEffect(() => {
        if (updatingProduct) {
            setName(updatingProduct.name)
            setPrice(updatingProduct.price.toString())
            setImage(updatingProduct.image)
        }
    }, [updateProduct])

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
            onUpdateCreate()
        } else {
            onCreate()
        }
    }

    const onUpdateCreate = () => {
        if (!validateInput()) {
            return;
        }

        setLoading2(true)

        updateProduct({ id: parseInt(id as string), name, price: parseFloat(price), image }, {
            onSuccess: () => {
                Alert.alert("Success", "Product updated successfully")
                router.back()
                setLoading2(false)
                resetFields()
            },
            onError: () => {
                Alert.alert("Error", "Failed to update product")
                setLoading2(false)
            }
        })

    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        setLoading(true)

        insertProduct({ name, price: parseFloat(price), image }, {
            onSuccess: () => {
                Alert.alert("Success", "Product created successfully")
                router.back()
                setLoading(false)
                resetFields()
            },
            onError: () => {
                Alert.alert("Error", "Failed to create product")
                setLoading(false)
            }
        })

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

    const onDelete = () => {
        deleteProduct(parseInt(id as string), {
            onSuccess: () => {
                Alert.alert("Success", "Product deleted successfully")
                router.replace('/(admin)')
            },
            onError: () => {
                Alert.alert("Error", "Failed to delete product")
            }
        })
     }

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
                aria-disabled={loading || loading2}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
                aria-disabled={loading || loading2}

            />

            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button 
                onPress={onSubmit} 
                text={isUpdating ? (loading2 ? "Updating..." : "Update") : (loading ? "Creating..." : "Create")} 
                aria-disabled={loading || loading2}
                />
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