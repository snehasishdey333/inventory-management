import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { expenseColumns, expenseData } from '@/data/data';
import { fetchExpenses } from '@/utils/api';
import Link from 'next/link';
import React from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

type FinanceItem = {
  id: number;
  date: string;
  title: string;
  amount: number;
  description: string;
};

const renderRow = (item: FinanceItem) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td className='hidden md:table-cell'>{item.description}</td>
    <td className="hidden md:table-cell">{item.amount}</td>
    <td className="hidden md:table-cell">{item.date}</td>
    <td className=''>
        <div className='flex items-center space-x-2'>
         <Link href={`/expenses/update/${item.id}`} className='p-2 rounded-full border border-gray-300 flex items-center justify-center'><FaEdit/></Link>
        </div>
    </td>
  </tr>
);

const ExpensesPage = async({ searchParams }: { searchParams: Promise<{ search?: string, page?:string }> }) => {
  // const searchQuery = searchParams.search || '';
  // const pageQuery=searchParams.page || '1'
  const {search} =await searchParams || '';
  let {page}=await searchParams 
  if(!page){
    page='1'
  }
  const {expenses:data,totalPages}=await fetchExpenses(search,page)
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className='flex items-center justify-between'>
            <h1 className='text-base md:text-lg font-semibold'>Expense List</h1>
            <div className='flex items-center space-x-3'>
            <TableSearch/>
            <Link href="/expenses/add" className='border border-gray-300 p-2 rounded-full'>
            <FaPlus/>
            </Link >
            </div>
            
          </div>
      {/* LIST */}
      <Table columns={expenseColumns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination currentPage={Number(page)} totalPages={totalPages} baseUrl="/expenses" />
    </div>
  )
}

export default ExpensesPage