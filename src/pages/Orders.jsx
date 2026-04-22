function Orders () {
    return(
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">Tus Ordenes</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                <article className="shadow-lg rounded-lg p-5 flex flex-col ">
                    <div className="flex justify-between mb-5">
                        <p className="font-bold text-lg ">Orden #<span>10</span></p>
                        <p className="font-bold text-xs border-2 p-1 rounded-2xl text-red-700">Pendiente</p>
                    </div>
                    <p><span className="font-bold">Entregar a: </span><span className="font-semibold text-sm">Nombre Persona</span></p>
                    <p><span className="font-bold">Direccion: </span><span className="font-semibold text-sm">Direccion</span></p>
                    <p><span className="font-bold">Total: </span><span className="font-semibold text-sm">Q50.00</span></p>
                </article>
            </section>
        </main>
    )
}

export default Orders