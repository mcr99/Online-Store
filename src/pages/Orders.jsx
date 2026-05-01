import { useContext, useEffect, useState } from "react"
import { supabase } from "../libs/supabaseClient"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

function Orders () {
    const [myOrders, setMyOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const { user } = useContext(AuthContext)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from("orders")
                .select(`
                    *,
                    order_items (
                        quantity,
                        unit_price
                    )
                    `)
                .eq("user_id", user.id)

            if (error) throw error
            setMyOrders(data)
        } catch (error) {
            toast.error("No pudimos cargar tus ordenes")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            fetchOrders()
        }
    }, [user])

    if (loading) return <p className="text-center my-20">Cargando tu historial...</p>

    return(
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl mb-10">Tus Ordenes</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-5 w-full">
                {myOrders.length === 0 ? (
                    <p className="text-center my-20">No se ha realizado una orden anteriormente</p>
                ): (
                    myOrders.map((order) => {
                        const items = order.order_items || []
                        const orderTotal = items.reduce((acc, item) => {
                            return acc + (Number(item.quantity || 0) * Number(item.unit_price || 0 ))
                        }, 0)
                        return(
                            <article className="w-full shadow-lg rounded-lg p-5 flex flex-col " key={order.id}>
                                <div className="flex justify-between items-center mb-5 gap-5">
                                    <p className="font-bold text-lg ">Orden #<span>{order.id.toString().slice(0,5)}</span></p>
                                    <p className={`${order.status === "pending" ? "text-red-700" : "text-green-700"} font-bold text-xs border-2 p-1 rounded-2xl `}>{order.status === "pending" ? "Pendiente" : "Completado"}</p>
                                </div>
                                <p><span className="font-bold">Entregar a: </span><span className="font-semibold text-sm">Nombre</span></p>
                                <p><span className="font-bold">Direccion: </span><span className="font-semibold text-sm">Direccion</span></p>
                                <p><span className="font-bold">Total: </span><span className="font-semibold text-sm">Q{orderTotal.toFixed(2)}</span></p>
                            </article>
                        )
                    }))}
                
            </section>
        </main>
    )
}

export default Orders