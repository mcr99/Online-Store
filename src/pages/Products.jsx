import { Pencil, Trash } from "lucide-react"

function Products () {
    return(
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl my-10">Listado de Productos</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <article className="rounded-xl shadow-lg p-5 flex flex-col gap-2">
                    <img src="photo.png" alt="photo" />
                    <h2 className="font-bold">Nombre del producto</h2>
                    <p><span className="font-bold">Stock: </span><span className="font-semibold text-sm">20</span></p>
                    <p><span className="font-bold">Precio: </span><span className="font-semibold text-sm">Q20.00</span></p>
                    <div>
                        <p className="font-bold">Descripcion:</p>
                        <p className="font-semibold text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam cumque vero qui quae magni fugiat ex consequatur minima magnam aperiam quam, quasi officiis molestiae reprehenderit numquam pariatur, possimus repudiandae odit.</p>
                    </div>
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

export default Products