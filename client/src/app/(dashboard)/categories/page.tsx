import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { categoryColumns, categoryData } from '@/data/data'
import { fetchCategories } from '@/utils/api'
import Link from 'next/link'
import React from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

type CategoryItem = {
  id: number;
  name:string
};

const renderRow = (item: CategoryItem) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.id}</td>
    <td>{item.name}</td>
    <td className=''>
        <div className='flex items-center space-x-2'>
         <Link href={`/categories/update/${item.id}`} className='p-2 rounded-full border border-gray-300 flex items-center justify-center'><FaEdit/></Link>
        </div>
    </td>
  </tr>
);

// const CategoriesListPage = async({ searchParams }: { searchParams: { search?: string; page?: string }}) => {
  const CategoriesListPage = async({ searchParams }: { searchParams: Promise<{ search?: string, page?:string }> }) => {
  
  const {search} =await searchParams || '';
  let {page}=await searchParams 
  if(!page){
    page='1'
  }
  const {categories:data,totalPages}=await fetchCategories(search, page)

  
  
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className='flex items-center justify-between'>
            <h1 className='text-base md:text-lg font-semibold'>Category List</h1>
            <div className='flex items-center space-x-3'>
            <TableSearch/>
            <Link href="/categories/add" className='border border-gray-300 p-2 rounded-full'>
            <FaPlus/>
            </Link>
            </div>
            
          </div>
      {/* LIST */}
      <Table columns={categoryColumns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      {/* <Pagination /> */}
      <Pagination currentPage={Number(page)} totalPages={totalPages} baseUrl="/categories" />
    </div>
  )
}

export default CategoriesListPage