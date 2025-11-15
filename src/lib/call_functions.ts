import api from "./axiosInstance"
import { cookies } from "next/headers"

export async function getData (endpoint:string){
    const cookieStore = await cookies()
    try{
        const response = await api.get(endpoint,{
            headers:{
                cookies: cookieStore.toString()
            }
        })
        const data = response.data
        return data

    }
    catch(error){
        console.error("Error fetching data:", error instanceof Error ? error.message : "Unknown error")
        return null;
    }
}