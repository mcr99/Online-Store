function Cart () {
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
                    <tr>
                        <td className="text-center">02</td>
                        <td className="p-2 hidden sm:flex justify-center items-center"><img src="photo.png" alt="photo" className="w-20"/></td>
                        <td className="p-2 text-center"><span>Nombre del producto </span><span > Q0.00 </span></td>
                        <td className="p-2 text-center">Q10.00</td>
                    </tr>
                    <tr>
                        <td className="text-center">02</td>
                        <td className="p-2 sm:flex justify-center items-center hidden"><img src="photo.png" alt="photo" className="w-20"/></td>
                        <td className="p-2 text-center "><span>Nombre del producto </span><span >Q0.00</span></td>
                        <td className="p-2 text-center ">Q220.00</td>
                    </tr>
                    <tr>
                        <td className="text-center">02</td>
                        <td className="p-2 hidden sm:flex justify-center items-center"><img src="photo.png" alt="photo" className="w-20"/></td>
                        <td className="p-2 text-center"><span>Nombre del producto </span><span > Q0.00</span></td>
                        <td className="p-2 text-center">Q1.00</td>
                    </tr>
                    <tr>
                        <td className="text-center">02</td>
                        <td className="p-2 hidden sm:flex justify-center items-center"><img src="photo.png" alt="photo" className="w-20"/></td>
                        <td className="p-2 text-center"><span>Nombre del producto </span><span >Q0.00</span></td>
                        <td className="p-2 text-center">Q250.00</td>
                    </tr>
                </tbody>
                <tfoot className="border-t border-lines">
                    <tr>
                        <td className="text-center font-bold">10</td>
                        <td className="hidden sm:block"></td>
                        <td className="text-end font-bold px-5">Total</td>
                        <td className=" text-center font-bold">Q20.00</td>
                    </tr>
                </tfoot>
            </table>
            <button className="bg-button px-8 py-3 rounded-2xl text-textbutton font-bold">Comprar</button>
        </main>
    )
}

export default Cart