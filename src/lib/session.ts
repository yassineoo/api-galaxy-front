import {getServerSession} from "next-auth/next"
import { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { UserData, authUser, getUserSession, oauthUser } from "@/actions/auth"
import { Session } from "inspector"
import SignToken from "./utils"

export const authOptions:NextAuthOptions={
    
    session:{
        strategy:"jwt"
    },
    providers:[
        GoogleProvider({
            clientId:"300197661179-tsd3gjfjnuqvknsfuhdr16kbkjtg0ehj.apps.googleusercontent.com",
            clientSecret:"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"
        }),
        CredentialProvider({
            name:"credentials",
            credentials:{
                email:{
                    type:"email",
                    label:"email"
                },
                password:{
                    type:"password",
                    label:"password"
                },
                username:{
                    type:"text",
                    label:"username"
                }

            },
            async authorize(credentials, req):Promise<any>{
                const isRegister = Boolean(credentials?.username)
                const data = {
                    Email: credentials?.email,
                    password: credentials?.password
                } as UserData
                if(isRegister){
                    data.Username=credentials?.username
                }
                const res = await authUser(data,isRegister)
                if(res?.message){
                    throw new Error(res?.message)
                }else{
                return res
            }},
        })
      ],
    theme:{
        colorScheme:"light",
        logo:"/logo.svg"
    },
   
    callbacks:{
        
        
       async jwt({user,token}) {
            if(user){
                const userLoggedIn= await SignToken(user?.email)
                token.userLogged=userLoggedIn
            }
            return token
        },
        async session({ session,token }): Promise<any> {
                if(token?.userLogged){
                    const existUser = await getUserSession(token.email!)
                   session.token=token.userLogged as string;
                   session.user.id=existUser.id as string;
                return session
          }
        },


        async signIn({user}:{
            user : User
        }):Promise<any>{
            try {
                const data={
                    Email:user?.email,
                    Username:user?.name
                  }
                  let res;
                 if(typeof(user) == "object" && !user?.csrfToken){
                    
                    res= await oauthUser(data)
                    
                    return res
                  }else{
                    return true
                  }
            } catch (error) {
                return false
            }
        }   
    },
    pages:{
      signIn:"/login"
    }
}



//create utility function
export async function getCurrentUser(){
    const session=await getServerSession(authOptions)
    return session
}