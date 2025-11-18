"use client";
import { authOption } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"

export default async function HomePage(){
    const session = await getServerSession(authOption)
    
    const user = session?.user

    return(
        <div className="h-screen justify-center items-center flex ">
            <button onClick={() => signOut()} className="hover:bg-[#E7E7E7] p-3 cursor-pointer rounded-md">Log out</button>
             Welcome back! {user.name}
        </div>
    )
}