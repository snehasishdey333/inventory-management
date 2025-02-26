
import FinanceChart from '@/components/FinanceChart'
import PopularProductsCard from '@/components/PopularProductsCard'
import SalesChart from '@/components/SalesChart'
import StaffChart from '@/components/StaffChart'
import { fetchDashboardData } from '@/utils/api'
import React from 'react'

const DashboardPage = async() => {
  const {popularProductsData,
    financeData,
    salesData,
    sexData}=await fetchDashboardData()
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