import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { supabase } from "../libs/supabaseClient"

function Settings () {
    const { user } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        second_last_name: '',
        address: '',
        phone_number: '',
        email: '',
        password: '', 
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProfile = async () => {
            if (!user) return
            
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (error) throw error
                if (data) {
                    setFormData(prev => ({
                        ...prev,
                        first_name: data.first_name || '',
                        middle_name: data.middle_name || '',
                        last_name: data.last_name || '',
                        second_last_name: data.second_last_name || '',
                        address: data.address || '',
                        phone_number: data.phone_number || '',
                        email: user.email || '',
                    }))
                }
            } catch (error) {
                console.error("Error cargando perfil:", error.message)
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [user])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    first_name: formData.first_name,
                    middle_name: formData.middle_name,
                    last_name: formData.last_name,
                    second_last_name: formData.second_last_name,
                    address: formData.address,
                    phone_number: formData.phone_number,
                })
                .eq('id', user.id)

            if (profileError) throw profileError

            const updateData = {}
            if (formData.email !== user.email) updateData.email = formData.email
            if (formData.password.length > 0) {
                if (formData.password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres")
                updateData.password = formData.password
            }

            if (Object.keys(updateData).length > 0) {
                const { error: authError } = await supabase.auth.updateUser(updateData)
                if (authError) throw authError
                if (updateData.email) alert("Se ha enviado un correo de confirmación a tu nueva dirección.")
            }

            alert("¡Perfil actualizado con éxito!")
            setFormData(prev => ({...prev, password: ''}))
        } catch (error) {
            alert("Error al actualizar: " + error.message)
        }
    }

    if (loading) return <p className="text-center my-10">Cargando datos...</p>

    return(
        <main className="flex flex-col items-center justify-center px-5 my-10">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-secondary/40 w-full max-w-100 gap-10 p-5 rounded-2xl shadow-sm">
                <h1 className="font-bold text-2xl">Actualizar Datos</h1>
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
                {/*
                    <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Correo Electronico</p>
                    <input type="email" className="border p-3 rounded-lg w-full font-semibold border-lines" name="email" value={formData.email} onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Contraseña</p>
                    <input type="password" className="border p-3 rounded-lg w-full font-semibold border-lines" name="password" value={formData.password} onChange={handleChange}/>
                </label>
                */}
                
                <button className="bg-button w-full p-3 rounded-xl text-textbutton font-bold">Actualizar Datos</button>
            </form>
        </main>
    )
}

export default Settings