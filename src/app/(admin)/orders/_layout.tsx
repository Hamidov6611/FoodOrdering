import React from 'react'
import { Stack } from 'expo-router'

const MenuStack = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Orders', }} /> */}
      <Stack.Screen name="list" options={{ title: 'Orders', headerShown: false }} />
    </Stack>
  )
}

export default MenuStack