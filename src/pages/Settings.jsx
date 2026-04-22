function Settings () {
    return(
        <main className="flex flex-col items-center justify-center px-5 my-10">
            <form className="flex flex-col justify-center items-center bg-secondary/40 w-full max-w-100 gap-10 p-5 rounded-2xl shadow-sm">
                <h1 className="font-bold text-2xl">Editar Usuario</h1>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Primer Nombre</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines"/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Segundo Nombre</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines"/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Primer Apellido</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines"/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Segundo Apellido</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines"/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Direccion de entrega</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines"/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Numero de Telefono</p>
                    <input type="tel" className="border p-3 rounded-lg w-full font-semibold border-lines"/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Correo Electronico</p>
                    <input type="email" className="border p-3 rounded-lg w-full font-semibold border-lines"/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Contraseña</p>
                    <input type="email" className="border p-3 rounded-lg w-full font-semibold border-lines"/>
                </label>
                <button className="bg-button w-full p-3 rounded-xl text-textbutton font-bold">Crear Cuenta</button>
            </form>
        </main>
    )
}

export default Settings