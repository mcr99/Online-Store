import { Menu, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

function Header() {
    const [hamburguerMenu, setHamburgerMenu] = useState(true)


    return(
        <>
        <header className="flex justify-between items-center px-5 py-2 shadow">
            <div className="flex items-center gap-3">
                <Menu className="w-11 h-11 p-2 sm:hidden hover:text-third" onClick={() => setHamburgerMenu(!hamburguerMenu)}/>
                <img src="logo.png" alt="Logo" className="w-11 p-2"/>
            </div>
            <nav className="hidden sm:flex justify-between gap-5 w-[70%] text-button">
                <Link className="p-2.5 font-bold hover:text-third w-full text-center">Home</Link>
                <Link className="p-2.5 font-bold hover:text-third w-full text-center">Ver Ordenes</Link>
                <Link className="p-2.5 font-bold hover:text-third w-full text-center">Configuracion</Link>
            </nav>
            <div className="relative">
                <div className="bg-button px-1.5 absolute top-0 right-0 rounded-full">
                    <p className="text-xs font-semibold text-textbutton">1</p>
                </div>
                <ShoppingCart className="w-11 h-11 p-2 hover:text-third"/>
            </div>
            
        </header>
        <nav className={`${hamburguerMenu? "hidden" : "flex"} sm:hidden flex-col items-center justify-center gap-2 text-button shadow`}>
            <Link className="p-2.5 font-bold hover:text-textbutton hover:bg-button w-full text-center">Home</Link>
            <Link className="p-2.5 font-bold hover:text-textbutton hover:bg-button w-full text-center">Ver Ordenes</Link>
            <Link className="p-2.5 font-bold hover:text-textbutton hover:bg-button w-full text-center">Configuracion</Link>
        </nav>
        </>
    )
}

export default Header