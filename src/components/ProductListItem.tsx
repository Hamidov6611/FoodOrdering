import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { defaultPizzaImage, Product, Tables } from "@/src/types"
import { Link, useSegments } from 'expo-router';

interface ProductListItemProps {
    product: Tables<'products'>
}


export const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments()
    const colorScheme = useColorScheme(); // Hookni bu yerda foydalaning

    const styles = createStyles(colorScheme); // StyleSheet'ni dinamik ravishda yarating

    return (
        <View style={styles.container}>

            <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
                <Pressable >
                    <Image
                        source={{ uri: product.image || defaultPizzaImage }} style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </Pressable>
            </Link>
        </View>
    )
}

const createStyles = (colorScheme) => StyleSheet.create({
    container: {
        backgroundColor: colorScheme === 'dark' ? 'black' : 'white', padding: 10,
        borderRadius: 20,
        borderWidth: colorScheme === 'dark' ? 1 : 0,
        borderColor: colorScheme === 'dark' ? Colors.dark.yellow : Colors.dark.tint,
        flex: 1,
        
        maxWidth: '50%'
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 18
    },
    price: {
        color: Colors.light.tint,
        fontWeight: '600',
        marginTop: 'auto',
    },
});