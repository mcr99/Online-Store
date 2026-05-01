import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext()

export const CartProvider =({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart =  localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItems = prevCart.find(item => item.id === product.id)
            if(existingItems) {
                return prevCart.map(item => 
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                )
            }
            return [...prevCart, {...product, quantity: 1}]
        })
    }
    
    const removeFromCart = (id) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === id)

            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(item => 
                    item.id === id ? {...item, quantity: item.quantity - 1 } : item
                )
            }
            return prevCart.filter(item => item.id !== id)
        })
    }

    const clearCart = () => setCart([])

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity),0)

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)