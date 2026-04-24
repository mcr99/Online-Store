import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Users from './pages/Users'
import { useContext, useEffect, useState } from 'react'
import Settings from './pages/Settings'
import Categories from './pages/Categories'
import { AuthContext, AuthProvider } from './context/authContext'
import PrivateRoute from './routes/PrivateRoute'
import AdminDashboard from './pages/AdminDashboard'

function App() {
    const {user, loading} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
    const publicPaths = ["#/", "#/login", "#/create-account"];
    const currentPath = window.location.hash;
    if (!loading && user?.role === "admin" && publicPaths.includes(currentPath)) {
        navigate("/dashboard");
    }
}, [user, loading, navigate]);


  return (
    <>
      <Header/>
      <Routes>
        {/*All */}
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/create-account' element={<CreateAccount/>}></Route>
        <Route path='/product-details' element={<ProductDetails/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>

        {/*user */}
        <Route path='/orders' element={
          <PrivateRoute allowedRoles={["user"]}>
            <Orders/>
          </PrivateRoute>
        }></Route>
        <Route path='/cart' element={
          <PrivateRoute allowedRoles={["user"]}>
            <Cart/>
          </PrivateRoute>
          }></Route>

        {/*Admin */}
        <Route path='/products' element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Products/>
          </PrivateRoute>
          }></Route>
        <Route path='/users' element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Users/>
          </PrivateRoute>
          }></Route>
          <Route path='/dashboard' element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard/>
          </PrivateRoute>
          }></Route>

        {/*Admin and User */}
        <Route path='/settings' element={
          <PrivateRoute allowedRoles={["admin", "user"]}>
            <Settings/>
          </PrivateRoute>
          }></Route>
      </Routes>
    </>
  )
}

export default App
