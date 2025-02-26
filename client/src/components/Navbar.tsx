
"use client"

import { createStaffInNotExist, fetchAuthUserInfo, fetchStaff } from "@/utils/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";
import { useEffect } from "react";
import { FaBoxOpen, FaSearch, FaUser } from "react-icons/fa";

const Navbar = () => {
 const { user } = useAuthenticator((context) => [context.user]);
   
  useEffect(()=>{
    const fetchAuthUserInfo=async()=>{
        try{
            
            let session = await fetchAuthSession()
            // const {idToken}=session.tokens ?? {}
            const user=await getCurrentUser()
            // console.log(user)
            // console.log(session)

            const userData = {
                cognitoId:user?.userId,
                name:"",
                address:"",
                phone:"",
                email:user?.signInDetails?.loginId || "",
                username:user?.username
            };

            const isUserExist=await fetchStaff({data: {cognitoId: userData.cognitoId}})
            if(!isUserExist){
              const userResponse=await createStaffInNotExist({data:userData})
            }
            // const userResponse=await createStaffInNotExist({data:userData})
            // console.log(userResponse)
        }
        catch(error){
            console.error("Error fetching user info", error)
            throw new Error("Failed to fetch user info")
        }
    }
    fetchAuthUserInfo()
  },[])
    return (
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center h-16">
         <Link href={user ? "/dashboard" : "/"} className='flex items-center space-x-2 justify-center md:justify-between'><FaBoxOpen size={24}/><span className="text-xl font-bold hidden md:block">Inventory Manager</span></Link>
         {user ? 
         (<Link href="settings" className="flex items-center space-x-2 text-sm md:text-base">
            <h1>{user?.username}</h1>
            <FaUser/>
         </Link>) : 
         (<div className="flex items-center space-x-3">
            <Link href="/signin" className="bg-white text-gray-800 hover:bg-gray-100 py-1 px-3 rounded-lg">
              Sign In
            </Link>
            <Link href="/signup" className="bg-white text-gray-800 hover:bg-gray-100 py-1 px-3 rounded-lg">
              Sign Up
            </Link>
          </div>)}
      </nav>
    );
  };

export default Navbar