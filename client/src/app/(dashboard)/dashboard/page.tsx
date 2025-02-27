"use client"
import FinanceChart from '@/components/FinanceChart'
import PopularProductsCard from '@/components/PopularProductsCard'
import SalesChart from '@/components/SalesChart'
import StaffChart from '@/components/StaffChart'
import { fetchDashboardData } from '@/utils/api'
import React, { useEffect, useState } from 'react'

interface DashboardData {
  popularProductsData: any;
  financeData: any;
  salesData: any;
  sexData: any;
}

const DashboardPage = () => {
  const [dataSet, setDataSet] = useState<DashboardData | null>(null)
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const {popularProductsData,
          financeData,
          salesData,
          sexData}=await fetchDashboardData()
          setDataSet({popularProductsData,
            financeData,
            salesData,
            sexData})
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])
  
  if(!dataSet){
    return <div>Loading...</div>
  }
  const {popularProductsData,financeData,salesData,sexData}=dataSet
    
  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4'>
      <PopularProductsCard data={popularProductsData}/>
      <FinanceChart data={financeData}/>
      <SalesChart data={salesData}/>
      <StaffChart data={sexData}/>
    </div>
  )
}

export default DashboardPage