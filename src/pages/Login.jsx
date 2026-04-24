import { CloudCog, Eye, EyeOff } from "lucide-react"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../libs/supabaseClient"
import { AuthContext } from "../context/AuthContext"

function Login () {
    const [eye, SetEye] = useState(true)
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const {email, password} = Object.fromEntries(formData.entries())

        try {
            const user = await login(email, password)
            
            if (user?.role === "admin") {
                navigate("/dashboard")
            } else {
                navigate("/")
            }
        } catch (error){
            console.error(error.message)
        }
    }

    


    return(
        <main className="flex flex-col items-center justify-center h-screen p-5">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-secondary/40 w-full max-w-100 gap-10 p-5 rounded-2xl shadow-sm">
                <img src="logo.png" alt="" className="w-11 mt-5"/>
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-center">Bienvenido de vuelta</h1>
                    <p className="text-center">Introduce tus credenciales para acceder</p>
                </div>
                <label className="w-full flex flex-col gap-2">
                    <p className="font-bold text-sm">Correo</p>
                    <input type="text" placeholder="correo@correo.com" className="border p-3 rounded-lg w-full font-semibold border-lines" name="email"/>
                </label>
                <label className="w-full flex flex-col gap-2 justify-center">
                    <p className="flex justify-between font-bold"><span className="text-sm"> Contraseña</span> <Link className="text-xs cursor-pointer text-button">Recuperar Contraseña?</Link></p>
                    <div className="flex items-center justify-between border py-3 pl-3 rounded-lg  w-full gap-5 border-lines">
                        <input type={eye ? "password" : "text"} placeholder="*******" className="font-semibold min-w-0 outline-none " name="password"/>
                        <button type="button" className="w-11 cursor-pointer text-lines" onClick={()=>SetEye(!eye)} >
                            {eye ? <Eye  /> : <EyeOff/>}
                        </button>
                    </div>
                </label>
                <button className="bg-button text-textbutton py-3  font-semibold rounded-lg w-full cursor-pointer">Ingresar</button>
                <section className="border-t border-lines w-full flex flex-col items-center gap-5 pt-10">
                <p className="text-xs font-bold flex gap-1">No tienes cuenta?<Link to={'/create-account'} className="text-button">Crear Cuenta</Link></p>
            </section>
            </form>
        </main>
    )
}

export default Login