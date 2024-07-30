import { Image, Pressable, StyleSheet } from 'react-native';
import { Text } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { defaultPizzaImage, Product } from "@/src/types"
import { Link } from 'expo-router';

interface ProductListItemProps {
    product: Product
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
    return (
        <Link href={`/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <Image 
                    source={{ uri: product.image || defaultPizzaImage }} style={styles.image} 
                    resizeMode='contain'
                    />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
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