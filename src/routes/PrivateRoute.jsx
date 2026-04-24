import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate } from "react-router-dom"

function PrivateRoute ({children, allowedRoles}) {
    const { user, loading } = useContext(AuthContext)
    if (loading) return <p>Cargando</p>
    if (!user) {
        return <Navigate to="/login"/>
    }
    const userRole = user.role

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/"/>
    }

    return children
}

export default PrivateRoute