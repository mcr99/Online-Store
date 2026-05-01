import { useCart } from "../context/CartContext"

function Cart () {
    const { cart, removeFromCart, totalPrice,  clearCart, totalItems } = useCart() 

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
            <button className="bg-button px-8 py-3 rounded-2xl text-textbutton font-bold">Comprar</button>
        </main>
    )
}

export default Cart