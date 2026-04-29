import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { supabase } from "../libs/supabaseClient"
import toast from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"

function Settings () {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [eye, setEye] = useState(true)
    const [profileData, setProfileData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        second_last_name: '',
        address: '',
        phone_number: '',
    })

    const [authData, setAuthData] = useState({
        email: '',
        password: '', 
    })

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
                    setProfileData({
                        first_name: data.first_name || '',
                        middle_name: data.middle_name || '',
                        last_name: data.last_name || '',
                        second_last_name: data.second_last_name || '',
                        address: data.address || '',
                        phone_number: data.phone_number || '',
                    })
                    setAuthData(prev => ({...prev, email: user.email || ""}))
                }
            } catch (error) {
                toast.error("Error al cargar perfil")
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [user])

    const handleProfileChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        })
    }

    const handleAuthChange = (e) => {
        setAuthData({...authData, [e.target.name]: e.target.value})
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        const load = toast.loading("Actualizando Perfil")
        try {
            const {error} = await supabase
            .from("profiles")
            .update(profileData)
            .eq("id", user.id)
            if(error) throw error
            toast.success("Perfil actualizado", {id: load})
        } catch (error){
            toast.error(error.message, {id: load})
        }
    }

    const updateEmail = async (e) => {
        e.preventDefault()
        if (authData.email === user.email) return toast.error("El correo es el mismo")
        
        try {
            console.log("Iniciando cambio de email a:", authData.email)
            const response = await supabase.auth.updateUser({ email: authData.email })
            console.log("Respuesta email:", response)

            if (response.error) {
                toast.error(response.error.message)
            } else {
                toast.success("Correo actualizado. ¡Revisa tu bandeja!")
            }
        } catch (error) {
            console.error("Error catch email:", error)
            toast.error("Error de conexión")
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault()
        if (authData.password.length < 6) return toast.error("Mínimo 6 caracteres")

        try {
            console.log("Iniciando cambio de pass...")
            const response = await supabase.auth.updateUser({ password: authData.password })
            console.log("Respuesta pass:", response)

            if (response.error) {
                toast.error(response.error.message)
            } else {
                toast.success("Contraseña actualizada con éxito")
                setAuthData(prev => ({ ...prev, password: "" }))
            }
        } catch (error) {
            console.error("Error catch pass:", error)
            toast.error("Error al actualizar")
        }
    }

    if (loading) return <p className="text-center my-10">Cargando datos...</p>

    return(
        <main className="flex flex-col items-center justify-center px-5 my-10 gap-10">
            <h1 className="font-bold text-2xl">Configuracion de Cuenta </h1>

            <form onSubmit={updateProfile} className="flex flex-col justify-center items-center bg-secondary/40 w-full max-w-100 gap-10 p-5 rounded-2xl shadow-sm">
                <h2 className="font-bold text-2xl text-center">Informacion de Contacto</h2>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Primer Nombre</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="first_name" value={profileData.first_name} onChange={handleProfileChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Segundo Nombre</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="middle_name" value={profileData.middle_name} onChange={handleProfileChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Primer Apellido</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="last_name" value={profileData.last_name} onChange={handleProfileChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Segundo Apellido</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="second_last_name"  value={profileData.second_last_name} onChange={handleProfileChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Direccion de entrega</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="address" value={profileData.address} onChange={handleProfileChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Numero de Telefono</p>
                    <input type="tel" className="border p-3 rounded-lg w-full font-semibold border-lines" name="phone_number" value={profileData.phone_number} onChange={handleProfileChange}/>
                </label>
                <button className="bg-button w-full p-3 rounded-xl text-textbutton font-bold">Actualizar Datos</button>
            </form>

            <form onSubmit={updateEmail} className="flex flex-col justify-center items-center bg-secondary/40 w-full max-w-100 gap-10 p-5 rounded-2xl shadow-sm">
                <h2 className="font-bold text-2xl text-center">Cambiar Correo</h2>
                    <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Correo Electronico</p>
                    <input type="email" className="border p-3 rounded-lg w-full font-semibold border-lines" name="email" value={authData.email} onChange={handleAuthChange}/>
                </label>
                <button className="bg-button w-full p-3 rounded-xl text-textbutton font-bold">Actualizar Correo</button>
            </form>
                
            <form onSubmit={updatePassword} className="flex flex-col justify-center items-center bg-secondary/40 w-full max-w-100 gap-10 p-5 rounded-2xl shadow-sm">
                <h2 className="font-bold text-2xl text-center">Cambiar Contraseña</h2>
                <label className="w-full flex flex-col gap-2 justify-center">
                    <p className="flex justify-between font-bold text-sm">Contraseña</p>
                    <div className="flex items-center justify-between border py-3 pl-3 rounded-lg  w-full gap-5 border-lines">
                        <input type={eye ? "password" : "text"} placeholder="*******" className="font-semibold min-w-0 outline-none " name="password" onChange={handleAuthChange} value={authData.password}/>
                        <button type="button" className="w-11 cursor-pointer text-lines" onClick={()=>setEye(!eye)} >
                            {eye ? <Eye  /> : <EyeOff/>}
                        </button>
                    </div>
                </label>
                <button className="bg-button w-full p-3 rounded-xl text-textbutton font-bold">Actualizar Contraseña</button>
            </form>
        </main>
    )
}

export default Settings