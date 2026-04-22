function ProductDetails () {
    return (
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center">
            <section>
                <article className=" p-5 grid grid-cols-1 sm:grid-cols-2 items-center justify-center">
                    <img src="photo.png" alt="photo" />
                    <div className="sm:p-10 font-semibold flex flex-col sm:gap-5">
                        <h1>Nombre del producto</h1>
                        <p>Precio: <span>Q100.00</span></p>
                        <p>No Disponible</p>
                    </div>
                </article>
                <article className="p-5 flex flex-col gap-5">
                    <p className="font-bold">Descripcion:</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil laudantium error quaerat consectetur qui quidem facilis doloribus dicta, nobis eveniet consequuntur illum praesentium iure rerum deleniti. Commodi, soluta atque? Nostrum!</p>
                </article>
            </section>
        </main>
    )
}

export default ProductDetails