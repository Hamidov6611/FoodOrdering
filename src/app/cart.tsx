import { View, Text, Platform, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

import { useCart } from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'
import Button from '../components/Button'
import Colors from '../constants/Colors'

const CartScreen = () => {
  const { items, total, checkout } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout =async  () => {
    try {
      setIsLoading(true)
      await checkout()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={{ padding: 10 }}>

      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, }}
      />

      <Text style={{ marginTop: 20, fontSize: 20 }}>Total: ${total.toFixed(2)}</Text>
      <Pressable onPress={handleCheckout} style={styles.button}>
        <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Checkout'}</Text>
      </Pressable>


      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default CartScreen