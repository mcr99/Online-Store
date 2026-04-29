import { Pencil, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import useCrud from "../hook/useCrud"
import toast from "react-hot-toast"
import { supabase } from "../libs/supabaseClient"


function Users () {
    const [modalEditUser, setModalEditUser] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [editingId, setEditingId] = useState(null)
    const [step, setStep] = useState(1)

    const {data: users, loading, insertRecord, getRecords, deleteRecord, updateRecord} = useCrud("profiles")

    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        second_last_name: "",
        address: "",
        phone_number: "",
        role: "",
        email: "",
        password: "",
    })

    useEffect(() => {
        const fetchFreshData = async () => {
            await getRecords()
        }
        fetchFreshData()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const nextStep = (e) => {
        e.preventDefault()
        setStep(2)
    }
    const prevStep = () => {
        setStep(1)
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    const loadingToast = toast.loading(editingId ? "Actualizando..." : "Creando...")

    try {
        if (editingId) {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    first_name: formData.first_name,
                    middle_name: formData.middle_name,
                    last_name: formData.last_name,
                    second_last_name: formData.second_last_name,
                    address: formData.address,
                    phone_number: formData.phone_number,
                    role: formData.role,
                })
                .eq('id', editingId)

            if (updateError) throw updateError
            toast.success("¡Usuario actualizado!", { id: loadingToast })

        } else {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            })
            if (authError) throw authError

            const userId = authData.user?.id
            if (userId) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        first_name: formData.first_name,
                        middle_name: formData.middle_name,
                        last_name: formData.last_name,
                        second_last_name: formData.second_last_name,
                        address: formData.address,
                        phone_number: formData.phone_number,
                        role: formData.role,
                    })
                    .eq('id', userId)

                if (profileError) throw profileError
                toast.success("Cuenta creada", { id: loadingToast })
            }
        }

        closeModal()
        getRecords()
    } catch (error) {
        toast.error("Error: " + error.message, { id: loadingToast })
    }
}

    const confirmDelete = async () => {
        if (idToDelete) {
            await deleteRecord(idToDelete)
            setModalDelete(false)
            setIdToDelete(null)
        }
    }

    const closeModal = () => {
        setModalEditUser(false)
        setStep(1)
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
            password: "",
        })
    }

    const openEditModal = (user) => {
        setEditingId(user.id)
        setFormData(user)
        setModalEditUser(true)
    }

    return(
        <main className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center w-full">
            <h1 className="font-bold text-2xl my-10">Listado de Usuarios</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full">
                {users.map((user) => (
                    <article className="rounded-xl shadow-lg p-5 flex flex- gap-2 w-full" key={user.id}>
                    <button onClick={() => openEditModal(user)} className="w-11">
                        <Pencil className="text-green-400 hover:text-green-500 w-11 h-11 p-2"/>
                    </button>
                    <div className="w-full">
                        <h2 className="font-bold" >{user.first_name} {user.middle_name} {user.last_name} {user.second_last_name}</h2>
                    <p><span className="font-bold">Direccion: </span><span className="font-semibold text-sm">{user.address}</span></p>
                    <p><span className="font-bold">Telefono: </span><span className="font-semibold text-sm">{user.phone_number}</span></p>
                    <p><span className="font-bold">Role: </span><span className="font-semibold text-sm">{user.role}</span></p>
                    </div>
                </article>
                ))}

                {modalEditUser && (
                    <section className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-black/50 w-full absolute h-full z-10" onClick={closeModal}></div>
                    <form onSubmit={handleSubmit} className="relative z-20 flex flex-col  justify-center bg-white w-full max-w-100 gap-5 p-6 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                        <button onClick={closeModal} className="mt-20 w-11 font-bold text-2xl">x</button>
                        <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Primer Nombre</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="first_name" value={formData.first_name} onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Segundo Nombre</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="middle_name" value={formData.middle_name} onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Primer Apellido</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="last_name" value={formData.last_name} onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Segundo Apellido</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="second_last_name"  value={formData.second_last_name} onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Direccion de entrega</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="address" value={formData.address} onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Numero de Telefono</p>
                    <input type="tel" className="border p-3 rounded-lg w-full font-semibold border-lines" name="phone_number" value={formData.phone_number} onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Role</p>
                    <select name="role" className="border p-3 rounded-lg w-full font-semibold border-lines" name="role" value={formData.role} onChange={handleChange}>
                        <option value="" disabled>Elige</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </label>
                <button className="bg-button w-full p-3 rounded-xl text-textbutton font-bold" >Actualizar Usuario</button>
                    </form>
                    </section>
                )}
            </section>
        </main>
    )
}

export default Users