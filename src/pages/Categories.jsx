function Categories () {
    return(
        <main className="p-5 xl:mx-[10%] my-10">
            <h1>Categorias</h1>
            <div>
                <section className="flex flex-col gap-5">
                    <h2>Nombre de la Categoria</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <article className="bg-secondary flex flex-col items-center justify-center rounded-xl shadow p-5 gap-2">
                            <img src="photo.png" alt="photo"  className="rounded-xl"/>
                            <h3 className="w-full text-start font-bold">Nombre del producto</h3>
                            <p className="w-full text-end font-semibold text-sm">Q20.00</p>
                            <div className="w-full">
                                <button className="bg-button text-textbutton w-full p-2 rounded-xl">Agregar</button>
                                <div className="flex gap-5 justify-center items-center hidden">
                                    <button className="bg-button text-textbutton px-3 font-bold text-2xl rounded flex justify-center items-center"><p className="relative bottom-0.5">-</p></button>
                                    <p className="font-bold text-2xl">1</p>
                                    <button className="bg-button text-textbutton px-2 font-bold text-2xl rounded flex justify-center items-center"><p className="relative bottom-0.5">+</p></button>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Categories