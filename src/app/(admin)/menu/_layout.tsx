import React from 'react'
import { Link, router, Stack } from 'expo-router'
import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'

const MenuStack = () => {
  return (
    <Stack screenOptions={{

    }}>
      <Stack.Screen name="index" options={{
        title: 'Home',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Link href="/" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={Colors.light.tint}
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1, marginRight: 10 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        headerRight: () => (
          <Link href="/(admin)/menu/create" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="plus-square-o"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }} />

      
    </Stack>
  )
}

export default MenuStack