import { createContext, useEffect, useState } from "react"
import { supabase } from "../libs/supabaseClient"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUserRole = async (sessionUser) => {
        if (!sessionUser?.id) return null

        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", sessionUser.id)
                .maybeSingle()

            if (error) {
                return { ...sessionUser, role: "user" }
            }

            const role = data?.role || "user"
            return { ...sessionUser, role }
        } catch (e) {
            return { ...sessionUser, role: "user" }
        }
    }

    useEffect(() => {
        let isMounted = true

        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            
            if (session && isMounted) {
                const fullUser = await fetchUserRole(session.user)
                setUser(fullUser)
            }
            
            if (isMounted) setLoading(false)

            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {

                if (newSession && isMounted) {
                    const fullUser = await fetchUserRole(newSession.user)
                    setUser(fullUser)
                } else if (isMounted) {
                    setUser(null)
                }
                
                if (isMounted) setLoading(false)
            })

            return subscription
        }

        const authSub = initializeAuth()

        return () => {
            isMounted = false
            authSub.then(sub => sub?.subscription?.unsubscribe())
        }
    }, [])

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        const fullUser = await fetchUserRole(data.user)
        setUser(fullUser) 
        return fullUser 
    }

    const logout = async () => {
        setLoading(true)
        await supabase.auth.signOut()
        setUser(null)
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}