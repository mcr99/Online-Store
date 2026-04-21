import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Users from './pages/Users'
import { useState } from 'react'
import Settings from './pages/Settings'
import Categories from './pages/Categories'

function App() {

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
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>

        {/*Admin */}
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/users' element={<Users/>}></Route>

        {/*Admin and User */}
        <Route path='/settings' element={<Settings/>}></Route>
      </Routes>
    </>
  )
}

export default App
