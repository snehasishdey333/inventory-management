
import IncomeUpdateForm from '@/components/forms/IncomeUpdateForm';
import { fetchIncome } from '@/utils/api';
import React from 'react'


const UpdateIncomePage = async({params}: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const data=await fetchIncome({data:{id:id}})
  return (
    <IncomeUpdateForm data={data}/>
  )
}

export default UpdateIncomePage