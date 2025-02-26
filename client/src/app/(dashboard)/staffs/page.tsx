import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { staffsColumns } from '@/data/data'
import { fetchStaffs } from '@/utils/api'
import React from 'react'

type StaffItem={
  id:string
  username:string,
  email:string,
  name:string
  address:string,
  sex:string,
  phone:string
}

const renderRow=(item:StaffItem)=>{
 return (<tr key={item.email} className='border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-gray-200'>
   <td className='p-4'>
    {item.username}
   </td>
   <td className=''>{item.name}</td>
   <td className=''>{item.email}</td>
   <td className='hidden md:table-cell'>{item.phone}</td>
   <td className='hidden md:table-cell'>{item.sex}</td>
   <td className='hidden md:table-cell'>{item.address}</td>
   
 </tr>)
}

const StaffsPage = async({ searchParams }: { searchParams: Promise<{ search?: string, page?:string }> }) => {
  const {search} =await searchParams || '';
  let {page}=await searchParams 
  if(!page){
    page='1'
  }
  const {staffs:data,totalPages}=await fetchStaffs(search,page)
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
          <div className='flex items-center justify-between'>
            <h1 className='text-base md:text-lg font-semibold'>Staff List</h1>
            <div className='flex items-center space-x-3'>
            <TableSearch/>
            </div>
            
          </div>

          <Table columns={staffsColumns} renderRow={renderRow} data={data}/>
          <Pagination currentPage={Number(page)} totalPages={totalPages} baseUrl="/staffs" />
        </div>
  )
}

export default StaffsPage