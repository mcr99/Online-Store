import { Pencil, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import useCrud from "../hook/useCrud"


function Users () {
    const [modalCreateUser, setModalCreateUser] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [editingId, setEditingId] = useState(null)

    const {data: users, loading, insertRecord, getRecords, deleteRecord, updateRecord} = useCrud("users")

    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        second_last_name: "",
        address: "",
        phone_number: "",
        role: "",
        email: "",
    })

    useEffect(() => {
        const fetchFreshData = async () => {
            await getRecords()
        }
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingId) {
            await updateRecord(editingId, formData)
        } else {
            await insertRecord(formData)
        }
        closeModal()
    }

    const confirmDelete = async () => {
        if (idToDelete) {
            await deleteRecord(idToDelete)
            setModalDelete(false)
            setIdToDelete(null)
        }
    }

    const closeModal = () => {
        setModalCreateUser(false)
        setEditingId(null)
        setFormData({
            first_name: "",
            middle_name: "",
            last_name: "",
            second_last_name: "",
            address: "",
            phone_number: "",
            role: "",
            email: "",
        })
    }

    const openEditModal = (user) => {
        setEditingId(user.id)
        setFormData(user)
        setModalCreateUser(true)
    }

    return(
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center w-full">
            <h1 className="font-bold text-2xl my-10">Listado de Usuarios</h1>
            <button onClick={()=> setModalCreateUser(!modalCreateUser)} className="bg-button text-textbutton py-2 px-4 rounded-sm font-semibold hover:bg-third mb-10 cursor-pointer">Agregar Usuario</button>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full">
                <article className="rounded-xl shadow-lg p-5 flex flex-col gap-2 w-full">
                    <h2 className="font-bold">Nombre del Usuario</h2>
                    <p><span className="font-bold">Direccion: </span><span className="font-semibold text-sm">Direccion del usuario</span></p>
                    <p><span className="font-bold">Correo: </span><span className="font-semibold text-sm">correo@correo.com</span></p>
                    <p><span className="font-bold">Telefono: </span><span className="font-semibold text-sm">555-554-5555</span></p>
                    <div className="flex justify-evenly mt-5">
                        <button>
                            <Pencil className="text-green-400 hover:text-green-500 w-11 h-11 p-2"/>
                        </button>
                        <button>
                            <Trash className="text-red-400 hover:text-red-500 w-11 h-11 p-2"/>
                        </button>
                    </div>
                </article>
            </section>

            {modalCreateUser && (
                <section className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-black/50 w-full absolute h-[150%] z-10" onClick={()=> setModalCreateUser(!modalCreateUser)}></div>
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
        </main>
    )
}

export default Users