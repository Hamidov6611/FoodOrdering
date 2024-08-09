import React from 'react'
import { Link, Stack, useRouter } from 'expo-router'
import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { View } from '@/src/components/Themed'
import { supabase } from '@/src/lib/supabase'

const MenuStack = () => {
  const router = useRouter()
  const userSignOut = () => {
    supabase.auth.signOut()
    router.push('/sign-in')
  }
  return (
    <Stack screenOptions={{
      headerRight: () => (
        <Link href="/sign-out" asChild>
          <Pressable>
            {({ pressed }) => (
              <View style={{ flexDirection: 'row', gap: 20 }}>

                <Link href="/cart" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="shopping-cart"
                        size={25}
                        color={Colors.light.tint}
                        style={{
                          marginRight: 15,
                          opacity: pressed ? 0.5 : 1,
                        }}
                      />
                    )}
                  </Pressable>
                </Link>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      onPress={userSignOut}
                      name="sign-out"
                      size={25}
                      color={Colors.light.tint}
                      style={{
                        marginRight: 15,
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>

              </View>
            )}
          </Pressable>
        </Link>
      ),
    }}>
      <Stack.Screen name="index" options={{ title: 'Menu', headerTitleAlign: 'center', }} />
    </Stack>
  )
}

export default MenuStack