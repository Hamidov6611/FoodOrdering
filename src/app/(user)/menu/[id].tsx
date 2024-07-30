import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage, PizzaSize, Product } from '@/src/types'
import { useState } from 'react'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const { addItem } = useCart()

  const router = useRouter()

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  const product = products.find((product: Product) => product.id.toString() === id)

  const addToCart = () => {
    if (!product) return

    addItem(product, selectedSize)

    router.push('/cart')
  }

  if (!product) {
    return <Text>Product not found</Text>
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />

      <Image source={{ uri: product?.image || defaultPizzaImage }} style={styles.image} />

      <Text>Select size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable onPress={() => setSelectedSize(size)} key={size} style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : '' }]}>
            <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]}>{size}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product?.price}</Text>

      <Button text="Add to cart" onPress={addToCart} />
    </ScrollView>
  )
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    resizeMode: 'contain',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  },
  sizeTextActive: {
    fontSize: 20,
    fontWeight: '600',
  },
})
