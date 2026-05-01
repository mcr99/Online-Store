import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [loadingCart, setLoadingCart] = useState(false)
    const {user} = useContext (AuthContext)

    useEffect(() => {
        if(user) {
            fetchCart()
        } else {
            setCart([])
        }
    }, [user])

    const fetchCart = async () => {
        if(!user) return
        setLoadingCart(true)
        const {data, error} = await supabase
            .from("cart_items")
            .select("quantity, product:products (*)")
            .eq("user_id", user.id)

        if (error) {
            toast.error(`Error cargando carrito`)
        } else {
            const formattedCart = data.map(item => ({
                ...item.product,
                quantity: item.quantity,
            }))
            setCart(formattedCart)
        }
        setLoadingCart(false)
    }

    const addToCart = async (product) => {
        if(!user) return toast.error("Debes iniciar Sesion")

        const itemInCart = cart.find(item => item.id === product.id)
        const newQuantity = itemInCart ? itemInCart.quantity + 1 : 1

        const { error } = await supabase
        .from("cart_items")
        .upsert({
            user_id: user.id,
            product_id: product.id,
            quantity: newQuantity
        }, {
            onConflict: "user_id, product_id"})

        if(!error) {
            fetchCart()
        }else {
            toast.error("No se pudo agregar al carrito")
        }
        toast.success(`Producto Agregado!`)
    }

    const removeFromCart = async (productId) => {
        const itemInCart = cart.find(item => item.id === productId)
        if (!itemInCart) return

        if (itemInCart.quantity > 1) {
            await supabase
                .from("cart_items")
                .update({quantity: itemInCart.quantity - 1 })
                .eq("user_id", user.id)
                .eq("product_id", productId)
        } else {
            await supabase
                .from("cart_items")
                .delete()
                .eq("user_id", user.id)
                .eq("product_id", productId)
        }
        fetchCart()
        toast.success(`Producto retirado!`)
    }

    const clearCart = async () => {
        const { error } = await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", user.id)

        if (!error) setCart([])
    }


    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity),0)

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice, loadingCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)