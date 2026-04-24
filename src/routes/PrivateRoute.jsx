import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

function PrivateRoute ({children, allowedRoles}) {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Verificando sesión...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login"/>
    }
    const userRole = user?.role

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/"/>
    }

    return children
}

export default PrivateRoute