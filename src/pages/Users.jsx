import { Pencil, Trash } from "lucide-react"

function Users () {
    return(
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl my-10">Listado de Usuarios</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                <article className="rounded-xl shadow-lg p-5 flex flex-col gap-2">
                    <h2 className="font-bold">Nombre del Usuario</h2>
                    <p><span className="font-bold">Direccion: </span><span className="font-semibold text-sm">Direccion del usuario</span></p>
                    <p><span className="font-bold">Correo: </span><span className="font-semibold text-sm">correo@correo.com</span></p>
                    <p><span className="font-bold">Telefono: </span><span className="font-semibold text-sm">555-554-5555</span></p>
                    <div className="flex justify-evenly mt-5">
                        <button>
                            <Pencil className="text-green-400 w-11 h-11 p-2"/>
                        </button>
                        <button>
                            <Trash className="text-red-400 w-11 h-11 p-2"/>
                        </button>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Users