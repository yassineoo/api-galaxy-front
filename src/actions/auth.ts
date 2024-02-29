import axios from "axios"
import { signIn } from "next-auth/react"
import { Inputs } from "@/types/common.types"
import { UseFormSetError } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"

export const placeholderApi=axios.create({
    baseURL:"http://localhost:5000"
})

export type UserData={
    Email:string 
    password : string 
    Username?:string
}

export const authUser=async(data:UserData,isRegister:boolean)=>{
    try {
        const res = await placeholderApi.post(`${isRegister ? "/register" : "/login"}`,JSON.stringify(data),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(res)
        if(res.status == 200){
            return res.data
        }else{
            return res.data.message
        }
    } catch (error:any) {
        return false
    }
}

export const oauthUser=async(data:any)=>{
    try {
        const res = await placeholderApi.post("/oauth",JSON.stringify(data),{
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(res.status == 200){
            return res.data
        }
    } catch (error) {
        return false
    }
}

export const getUserSession=async(email:string)=>{
        try {
            const res = await placeholderApi.post("/session",JSON.stringify({email}),{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(res.status == 200){
                return res.data
            }
        } catch (error) {
            return null
        }
}   





export const authenticate = async(data:Inputs,setError:UseFormSetError<Inputs>,setSuccess:Dispatch<SetStateAction<boolean>>) =>{
    try {
        
        const res = await signIn("credentials",{
            ...data,
            redirect:false
        })
        if(res?.ok) {
           setSuccess(true)
        }else{
            setError("errorMessage",{
               message:res?.error!
            })
        }
    } catch (error:any) {
            setError("errorMessage",{
                message : error?.message
            })

    }
}
