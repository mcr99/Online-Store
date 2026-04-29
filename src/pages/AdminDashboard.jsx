import { Link, Route, Routes } from "react-router-dom"
import Users from "./Users"
import Products from "./Products"
import OrdersAdmin from "./OrdersAdmin"

function AdminDashboard () {
    return(
        <div className="px-5 xl:mx-[10%] my-10 flex flex-col items-center justify-center">
            <nav className="flex justify-center items-center gap-5 flex-wrap">
                <Link to="/dashboard/orders" className="bg-button text-textbutton py-1 px-2 rounded-sm font-semibold hover:bg-third">Pedidos</Link>
                <Link to="/dashboard/products" className="bg-button text-textbutton py-1 px-2 rounded-sm font-semibold hover:bg-third">Productos</Link>
                <Link to="/dashboard/users" className="bg-button text-textbutton py-1 px-2 rounded-sm font-semibold hover:bg-third">Usuarios</Link>
                <Link to="/dashboard/orders"></Link>
            </nav>
            <Routes>
                <Route path="orders" element={<OrdersAdmin/>}></Route>
                <Route path='products' element={<Products/>}></Route>
                <Route path='users' element={<Users/>}></Route>
            </Routes>
        </div>
    )
}

export default AdminDashboard