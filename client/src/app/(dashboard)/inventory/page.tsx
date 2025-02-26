import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { InventoryColumns, inventoryData, products } from '@/data/data'
import { fetchInventory } from '@/utils/api'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

type InventoryItem={
   categoryName:string,
   products:number | string,
   units: number | string
}

const renderRow=(item:InventoryItem)=>{
  return (<tr key={item.categoryName} className='border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-gray-200'>
    <td className='p-4'>{item.categoryName}</td>
    <td className="">{item.products}</td>
    <td className="">{item.units}</td>
  </tr>)
}

const InventoryPage = async({ searchParams }: { searchParams: Promise<{ search?: string, page?:string }> }) => {
  const {search} =await searchParams || '';
  let {page}=await searchParams 
  if(!page){
    page='1'
  }
  const {inventory:data,totalPages}=await fetchInventory(search,page)
    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
          <div className='flex items-center justify-between'>
            <h1 className='text-base md:text-lg font-semibold'>Inventory List</h1>
            
            <TableSearch/>
            
          </div>
          <Table columns={InventoryColumns} renderRow={renderRow} data={data}/>
          <Pagination currentPage={Number(page)} totalPages={totalPages} baseUrl="/inventory" />
        </div>
    )
}

export default InventoryPage