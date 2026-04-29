import { useEffect } from "react"
import useCrud from "../hook/useCrud"
import { useNavigate } from "react-router-dom"

function Home () {
    const {data: products, getRecords, loading} = useCrud("products")
    const navigate = useNavigate()

    useEffect(() => {
        getRecords()
    },[])

    if (loading) return <p className="text-center my-20">Cargando productos...</p>
    return(
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center">
            {/**<img src="photo.png" alt="photo" />
            <p>HOme para todos</p> */}
            <section className=" flex-col grid grid-cols-1 sm:grid-cols-2 gap-5">
                {products.map((product) => (
                    <article className=" flex flex-col items-center justify-center rounded-xl shadow p-5 gap-2 relative" key={product.id}>
                        <p className="absolute top-6 right-6 bg-background text-green-600 rounded-2xl p-1 border-2 text-sm font-bold">Disponible</p>
                        <div className="cursor-pointer w-full flex flex-col items-center gap-2" onClick={() => navigate(`/product/${product.id}`)}>
                            <img src={product.image_url} alt={product.name}  className="rounded-xl h-50 w-full"/>
                            <p className="w-full text-start font-bold">{product.name}</p>
                        </div>
                        <p className="w-full text-end font-semibold text-sm">Q{product.price}</p>
                        <div className="w-full">
                            <button className="bg-button text-textbutton w-full p-2 rounded-xl">Agregar</button>
                            <div className="flex gap-5 justify-center items-center hidden">
                                <button className="bg-button text-textbutton px-3 font-bold text-2xl rounded flex justify-center items-center"><p className="relative bottom-0.5">-</p></button>
                                <p className="font-bold text-2xl">1</p>
                                <button className="bg-button text-textbutton px-2 font-bold text-2xl rounded flex justify-center items-center"><p className="relative bottom-0.5">+</p></button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default Home
