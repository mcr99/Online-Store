import { useState } from "react"
import { supabase } from "../libs/supabaseClient"

function useCrud(table){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError]= useState(null)

    const getRecords = async () => {
        setLoading(true)
        const {data, error} = await supabase.from(table).select("*")
        if(error) setError(error.message)
            else setData(data)
        setLoading(false)
    }

    const insertRecord = async (newRecord) => {
        setLoading(true)
        const {data: result, error} = await supabase.from(table).insert([newRecord]).select()
        if (error) setError(error.message)
            else setData((prev) => [...prev, ...result])
        setLoading(false)
    }

    const updateRecord = async (id, updateRecord) => {
        setLoading(true)
        const {error} = await supabase.from(table).update(updateRecord).eq("id", id)
        if (error) setError(error.message)
            else getRecords()
        setLoading(false)
    }

    const deleteRecord = async (id) => {
        setLoading(true)
        const {error} = await supabase.from(table).delete().eq("id", id)
        if (error) setError(error.message)
            else setData((prev) => prev.filter((item) => item.id !== id))
        setLoading(false)
    }

    const uploadFile = async (bucket, file) => {
        setLoading(true)
        const fileName = `${Date.now()}_${file.name}`
        const {data, error} = await supabase.storage
        .from(bucket)
        .upload(fileName, file)

        if(error) {
            console.error("Error en Storage:", error)
            setError(error.message)
            setLoading(false)
            return null
        }

        const {data: publicUrlData} = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

        setLoading(false)
        return publicUrlData.publicUrl
    }

    return{data, loading, error, getRecords, insertRecord, updateRecord, deleteRecord,  uploadFile}
}

export default useCrud