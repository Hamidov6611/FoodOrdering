import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
    items: CartItem[],
    addItem: (item: Product, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void
}

export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, size: CartItem['size']) => {

        const existingCartItem = items.find(item => item.product_id === product.id && item.size === size)

        if (existingCartItem) {
            return updateQuantity(existingCartItem.id, 1)
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }

        setItems([...items, newCartItem])
    }

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const updatedItems = items.map(item => item.id !== itemId ? item : { ...item, quantity: item.quantity + amount })
        .filter(item => item.quantity > 0)

        setItems(updatedItems)
    }

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => {
    return useContext(CartContext)
}