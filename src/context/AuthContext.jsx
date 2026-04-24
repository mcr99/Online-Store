import { createContext, useEffect, useState } from "react";
import { supabase } from "../libs/supabaseClient";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUserRole = async (sessionUser) => {
        if (!sessionUser) return null;
        const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", sessionUser.id)
            .single()

        if (error) {
            console.error("Error buscando rol:", error.message)
            return { ...sessionUser, role: "user" }
        }
        return { ...sessionUser, role: data?.role || "user" }
    }

    useEffect(() => {
        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                const fullUser = await fetchUserRole(session.user)
                setUser(fullUser)
            }
            setLoading(false)
        }

        initSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session) {
                const fullUser = await fetchUserRole(session.user)
                setUser(fullUser)
            } else {
                setUser(null)
            }
            setLoading(false)
        });

        return () => subscription.unsubscribe()
    }, [])

    const login = async (email, password) => {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) throw authError

        const fullUser = await fetchUserRole(authData.user)
        setUser(fullUser);
        return fullUser;
    }

    const logout = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};