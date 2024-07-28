import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
    items: CartItem[],
    addItem: (item: Product, size: CartItem['size']) => void
}

export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, size: CartItem['size']) => {
        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }

        const existingCartItem = items.find((item) => item.product_id === product.id && item.size === size)

        if (existingCartItem) {
            existingCartItem.quantity += 1
            setItems([...items])
            return
        }

        setItems([...items, newCartItem])
    }

    return (
        <CartContext.Provider value={{ items, addItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => {
    return useContext(CartContext)
}