import { redirect } from 'next/navigation'
import React from 'react'

const Home = () => {
  return (
    redirect("/dashboard")
  )
}

export default Home