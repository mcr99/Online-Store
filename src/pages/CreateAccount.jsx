import { useState } from "react"
import { supabase } from "../libs/supabaseClient"
import { useNavigate } from "react-router-dom"


function CreateAccount () {
    const navigate = useNavigate()
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
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
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
                        role: 'user'
                    })
                    .eq('id', userId)

                if (profileError) throw profileError

                alert("¡Cuenta creada y perfil guardado!")
                navigate("/login")
            }

        } catch (error) {
            alert("Error: " + error.message)
        }
    }


    return(
        <main className="flex flex-col items-center justify-center px-5 my-10">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-secondary/40 w-full max-w-100 gap-10 p-5 rounded-2xl shadow-sm">
                <h1 className="font-bold text-2xl">Crear Cuenta</h1>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Primer Nombre</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="first_name" required onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Segundo Nombre</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="middle_name" onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Primer Apellido</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="last_name" required onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Segundo Apellido</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="second_last_name" onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Direccion de entrega</p>
                    <input type="text" className="border p-3 rounded-lg w-full font-semibold border-lines" name="address" required onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Numero de Telefono</p>
                    <input type="tel" className="border p-3 rounded-lg w-full font-semibold border-lines" name="phone_number" required onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Correo Electronico</p>
                    <input type="email" className="border p-3 rounded-lg w-full font-semibold border-lines" name="email" required onChange={handleChange}/>
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Contraseña</p>
                    <input type="password" className="border p-3 rounded-lg w-full font-semibold border-lines" name="password" required onChange={handleChange}/>
                </label>
                <button className="bg-button w-full p-3 rounded-xl text-textbutton font-bold" type="submit">Crear Cuenta</button>
            </form>
        </main>
    )
}

export default CreateAccount