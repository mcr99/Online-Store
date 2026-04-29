import { Pencil, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import useCrud from "../hook/useCrud"
import { supabase } from "../libs/supabaseClient"

function Products () {
    const [modalCreateProduct, setModalCreateProduct] = useState(false)
    const [file, setFile] = useState(null)
    const [modalDelete, setModalDelete] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [editingId, setEditingId] = useState(null)

    const {data: products, loading, insertRecord, getRecords, deleteRecord, uploadFile, updateRecord} = useCrud("products")

    const [formData, setFormData] = useState({
        name: "",
        stock: 0,
        price: 0,
        description: "",
        image_url: "photo.png"
    })

    useEffect(() => {
        const fetchFreshData = async () => {
            await getRecords()
        }
        fetchFreshData()
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "image_url") {
            setFile(e.target.files[0])
        } else {
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let publicUrl = formData.image_url

        if (file) {
            const uploadedUrl = await uploadFile("products_images", file)
            if (uploadedUrl) {
                publicUrl = uploadedUrl
            }
        }

        const finalData = {...formData, image_url: publicUrl}
        if(editingId){
            await updateRecord(editingId, finalData)
        } else {
            await insertRecord(finalData)
        }
        setEditingId(null)
        setFormData({name: "", stock: 0, price: 0, description: "", image_url: "photo.png",})

        setModalCreateProduct(!modalCreateProduct)
        setFile(null)
    }

    const openDeleteModal = (id) => {
        setIdToDelete(id)
        setModalDelete(!modalDelete)
    }

    const confirmDelete = async () => {
        if (idToDelete) {
            await deleteRecord(idToDelete)
            setModalDelete(!modalDelete)
            setIdToDelete(null)
        }
    }

    const openEditModal = (product) => {
        setEditingId(product.id)
        setFormData({
            name: product.name,
            stock: product.stock,
            price: product.price,
            description: product.description,
            image_url: product.image_url,
        })
        setModalCreateProduct(!modalCreateProduct)
    }

    const closeModal = () => {
        setModalCreateProduct(!modalCreateProduct)
        setEditingId(null)
        setFile(null)
        setFormData({name: "", stock: 0, price: 0, description: "", image_url: "photo.png"})
    }

    return(
        <main className="px-5 my-10 flex flex-col items-center justify-center relative w-full">
            <h1 className="font-bold text-2xl my-10 text-center">Listado de Productos</h1>
            <button onClick={()=> setModalCreateProduct(!modalCreateProduct)} className="bg-button text-textbutton py-2 px-4 rounded-sm font-semibold hover:bg-third mb-10 cursor-pointer">Agregar Producto</button>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-5">
                {products.map((product) => (
                    <article className="rounded-xl shadow-lg p-5 flex flex-col gap-2" key={product.id}>
                    <img src={product.image_url} alt={product.name} loading="lazy" className="h-50 rounded-lg"/>
                    <h2 className="font-bold">{product.name}</h2>
                    <p><span className="font-bold">Stock: </span><span className="font-semibold text-sm">{product.stock}</span></p>
                    <p><span className="font-bold">Precio: </span><span className="font-semibold text-sm">Q{product.price}</span></p>
                    <div>
                        <p className="font-bold">Descripcion:</p>
                        <p className="font-semibold text-sm">{product.description}</p>
                    </div>
                    <div className="flex justify-evenly mt-5">
                        <button onClick={() => openEditModal(product)}>
                            <Pencil className="text-green-400 hover:text-green-500 w-11 h-11 p-2 cursor-pointer"/>
                        </button>
                        <button onClick={() => openDeleteModal(product.id)}>
                            <Trash className="text-red-400 hover:text-red-500 w-11 h-11 p-2 cursor-pointer"/>
                        </button>
                    </div>
                </article>
                ))}
            </section>

            {modalCreateProduct && (
                <section className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-black/50 w-full absolute h-[150%] z-10" onClick={()=> setModalCreateProduct(!modalCreateProduct)}></div>
                    <form className="flex flex-col w-full max-w-2xl gap-5 p-8 rounded-lg shadow-2xl bg-background z-20 max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
                        <button className="font-bold text-2xl w-11"type="button" onClick={closeModal} >X</button>
                        <p className="font-bold text-xl text-center">{editingId ? "Editar Producto" : "Crear Nuevo Producto"}</p>
                        <label className="w-full flex flex-col gap-2">
                            <p className="font-bold text-sm">Nombre del Producto: </p>
                            <input type="text" required className="border p-3 rounded-lg w-full font-semibold border-lines" name="name" onChange={handleChange} value={formData.name}/>
                        </label>
                        <label className="w-full flex flex-col gap-2">
                            <p className="font-bold text-sm">Stock</p>
                            <input type="number" required className="border p-3 rounded-lg w-full font-semibold border-lines" name="stock" onChange={handleChange} value={formData.stock}/>
                        </label>
                        <label className="w-full flex flex-col gap-2">
                            <p className="font-bold text-sm">Precio</p>
                            <input type="number" required className="border p-3 rounded-lg w-full font-semibold border-lines" name="price" onChange={handleChange} value={formData.price}/>
                        </label>
                        <label className="w-full flex flex-col gap-2">
                            <p className="font-bold text-sm">Descripcion</p>
                            <input type="text" required className="border p-3 rounded-lg w-full font-semibold border-lines" name="description" onChange={handleChange} value={formData.description}/>
                        </label>
                        <label className="w-full flex flex-col gap-2">
                            <p className="font-bold text-sm">Imagen</p>
                            <input type="file" className="border p-3 rounded-lg w-full font-semibold border-lines" name="image_url" onChange={handleChange}/>
                        </label>
                        
                        <button className="bg-button w-full p-3 rounded-xl text-textbutton font-bold" type="submit">{editingId ? "Actualizar Producto" : "Crear Producto"}</button>
                    </form>
                </section>
            )}

            {modalDelete && (
                <section className="flex flex-col items-center justify-center px-5 my-10 fixed top-[45%] w-full">
                    <div className="bg-black/50 w-full absolute h-[1000%] z-10"></div>
                    <div className="bg-background flex flex-col z-20 gap-10 p-5 items-center justify-center rounded-lg">
                        <p className="text-center font-bold">Quieres Eliminar el producto?</p>
                        <div className="flex justify-center items-center gap-5 w-full">
                            <button className="bg-green-700 hover:bg-green-800 w-full py-2 rounded-lg text-textbutton font-semibold" onClick={() => setModalDelete(!modalDelete)}>Cancelar</button>
                            <button className="bg-red-700 hover:bg-red-800 w-full py-2 rounded-lg text-textbutton font-semibold" onClick={confirmDelete}>Si</button>
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}

export default Products