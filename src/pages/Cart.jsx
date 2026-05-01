import { useContext, useState } from "react";
import { useCart } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../libs/supabaseClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart () {
    const { cart, removeFromCart, totalPrice,  clearCart, totalItems } = useCart() 
    const { user } = useContext(AuthContext)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()

    const handleCheckout = async () => {
        if (cart.length === 0 ) return toast.error("El carrito esta vacio")
        setIsProcessing(true)
        const toastId = toast.loading("Procesando tu compra") 
        try {
            const {data: order, error: orderError} = await supabase
                .from("orders")
                .insert([{user_id: user.id, status: "pending"}])
                .select()
                .single()
            
            if(orderError) throw orderError

            const orderItems = cart.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.price,
            }))

            const { error: itemsError } = await supabase
                .from("order_items")
                .insert(orderItems)

            if(itemsError) throw itemsError

            await clearCart()
            toast.success("Compra Realizada", {id: toastId})
            navigate("/orders")
        } catch (error) {
            toast.error("Error al procesar la compra", {id: toastId})
            console.error(error)
        } finally{
            setIsProcessing(false)
        }
    }

    if (cart.length === 0) return <p className="text-center my-20">El carrito está vacío</p>;
    return(
        <main className="p-5 xl:mx-[10%] my-10 flex flex-col gap-10 justify-center items-center">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th className="hidden sm:block">Imagen</th>
                        <th>Descripcion</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td className="text-center">{item.quantity}</td>
                            <td className="p-2 hidden sm:flex justify-center items-center"><img src={item.image_url} alt="photo" className="w-20 h-15 rounded-lg"/></td>
                            <td className="p-2 text-center"><span>{item.name}</span><span > Q{item.price.toFixed(2)} </span></td>
                            <td className="p-2 text-center">Q{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="border-t border-lines">
                    <tr>
                        <td className="text-center font-bold">{totalItems}</td>
                        <td className="hidden sm:block"></td>
                        <td className="text-end font-bold px-5">Total</td>
                        <td className=" text-center font-bold">Q{totalPrice.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            <button onClick={handleCheckout} className="bg-button px-8 py-3 rounded-2xl text-textbutton font-bold">Comprar</button>
        </main>
    )
}

export default Cart