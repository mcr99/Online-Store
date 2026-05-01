import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { supabase } from "../libs/supabaseClient"
import { useCart } from "../context/CartContext"
import toast from "react-hot-toast"


function ProductDetails () {
    const {id} = useParams()
    const { addToCart, cart, removeFromCart } = useCart()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        const fetchProduct = async () => {
            const {data, error} = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single()

                if (error) {
                    navigate("/")
                } else {
                    setProduct(data)
                }
                setLoading(false)
        }
        fetchProduct()
    },[id, navigate])

    const itemInCart = cart.find((item) => item.id === product?.id)
    const quantity = itemInCart ? itemInCart.quantity : 0

    if (loading) {
        return <div className="h-screen flex items-center justify-center font-bold">Cargando producto...</div>
    }

    if (!product) {
        return <div className="h-screen flex items-center justify-center">Producto no encontrado</div>
    }

    return (
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center">
            <section>
                <Link to="/" className="bg-button py-2 px-4 text-textbutton font-semibold rounded-lg">Regresar</Link>
                <article className=" p-5 grid grid-cols-1 sm:grid-cols-2 items-center justify-center">
                    <img src={product.image_url} alt={product.name}  className="rounded-lg max-h-150 my-10"/>
                    <div className="sm:p-10 font-semibold flex flex-col gap-5">
                        <h1 className="font-bold text-2xl">{product.name}</h1>
                        <p className="font-bold">Precio: <span className="font-semibold">Q{product.price}</span></p>
                        <p>{product.stock > 0 ? "Disponible" : "No Disponible"}</p>
                        <div className="w-full">
                            {quantity === 0 ? (
                                <button onClick={() => {
                                addToCart(product)
                            }} className="text-center bg-button text-textbutton w-full p-2 rounded-xl" >Agregar</button>
                            ):(
                                <div className="flex gap-5 justify-center items-center">
                                    <button className="bg-button text-textbutton px-3 font-bold text-2xl rounded flex justify-center items-center" onClick={()=> {
                                        removeFromCart(product.id)
                                    }}>
                                        <p className="relative bottom-0.5">-</p>
                                    </button>
                                    <p className="font-bold text-2xl">{quantity}</p>
                                    <button className="bg-button text-textbutton px-2 font-bold text-2xl rounded flex justify-center items-center" onClick={()=> {
                                        addToCart(product)
                                    }}>
                                        <p className="relative bottom-0.5">+</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </article>
                <article className="p-5 flex flex-col gap-5">
                    <p className="font-bold">Descripcion:</p>
                    <p className="font-semibold">{product.description}</p>
                </article>
            </section>
        </main>
    )
}

export default ProductDetails