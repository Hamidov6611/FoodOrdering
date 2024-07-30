import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage, PizzaSize, Product } from '@/src/types'
import { useState } from 'react'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'

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

      <Stack.Screen options={{
        title: 'Menu',
        headerRight: () => (
          <Link href={` /(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }} />

      <Stack.Screen options={{ title: product?.name }} />

      <Image source={{ uri: product?.image || defaultPizzaImage }} style={styles.image} />



      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>

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
  },
  title: {
    fontSize: 20,
  }
})
