import { LogIn, LogOut, Menu, Settings, ShoppingCart } from "lucide-react"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useCart } from "../context/CartContext"



function Header() {
    const [hamburguerMenu, setHamburgerMenu] = useState(true)
    const {user, logout} = useContext(AuthContext)
    const {totalItems} = useCart()


    return(
        <header className="shadow">
        <div className="flex justify-between items-center px-5 py-2  xl:mx-[10%]">
            <div className="flex items-center gap-2">
                <Menu className="w-11 h-11 p-2 sm:hidden hover:text-third" onClick={() => setHamburgerMenu(!hamburguerMenu)}/>
                <Link to={"/"}>
                    <img src="logo.png" alt="Logo" className="w-11 p-2"/>
                </Link>
            </div>
            <nav className="hidden sm:flex justify-between gap-5 w-[70%] text-button">
                {user?.role === "user" && (
                        <>
                            <Link to={"/"} className="p-2.5 font-bold hover:text-third w-full text-center">Home</Link>
                            <Link to={"/orders"} className="p-2.5 font-bold hover:text-third w-full text-center">Ordenes</Link>
                        </>
                    )}

                {user?.role === "admin" && (
                        <>
                            <Link to={"/"} className="p-2.5 font-bold hover:text-third w-full text-center">Home</Link>
                            <Link to={'/dashboard'} className="p-2.5 font-bold hover:text-third w-full text-center">Dashboard</Link>
                        </>
                    )}

                
            </nav>
            <div className="flex gap-2 sm:gap-5">
                {user?.role === "user" && (
                        <Link to={"/cart"} className="relative">
                            <div className="bg-button px-1.5 absolute top-0 right-0 rounded-full">
                                <p className="text-xs font-semibold text-textbutton">{totalItems}</p>
                            </div>
                            <ShoppingCart className="w-11 h-11 p-2 hover:text-third" />
                        </Link>
                    )}
            {user && (
        <>
            <Link to={"/settings"}>
                <Settings className="w-11 h-11 p-2 hover:text-third" />
            </Link>
            <button onClick={logout} className="cursor-pointer">
                <LogOut className="w-11 h-11 p-2 hover:text-third" />
            </button>
        </>
    )}

    {!user && (
        <Link to="/login" className="text-sm font-bold text-button p-2">
            <LogIn className="w-11 h-11 p-2 hover:text-third"/>
        </Link>
    )}
            </div>
        </div>
        <nav className={`${hamburguerMenu? "hidden" : "flex"} sm:hidden flex-col items-center justify-center gap-2 text-button shadow`}>
            <Link to={"/"} className="p-2.5 font-bold hover:text-textbutton hover:bg-button w-full text-center">Home</Link>
            {user?.role === "user" && (
                        <Link to={"/orders"} className="p-2.5 font-bold hover:text-textbutton hover:bg-button w-full text-center">Ordenes</Link>
                    )}

            {user?.role === "admin" && (
                        <>
                            <Link to={'/dashboard'} className="p-2.5 font-bold hover:text-textbutton hover:bg-button w-full text-center">Dashboard</Link>
                        </>
                    )}
        </nav>
        </header>
    )
}

export default Header