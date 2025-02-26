import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { productColumns, products } from '@/data/data';
import { fetchProducts } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

type ProductItem={
  id:string
  name:string,
  price:number | string,
  rating:number | string,
  description: string,
  sales:number | string,
  image:string
}

const renderRow=(item:ProductItem)=>{
 return (<tr key={item.id} className='border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-gray-200'>
   <td className='p-4'>
    <div className='flex items-center space-x-2'>
     {item?.image && <Image src={item.image} alt="" height={40} width={40}/>}
     <p className='font-semibold'>{item.name}</p>
    </div>
   </td>
   <td className='hidden md:table-cell'>{item.description.slice(0,20)+" ..."}</td>
   <td className="hidden md:table-cell">{item.price}</td>
   <td className="hidden md:table-cell">{item.rating}</td>
   <td className='hidden md:table-cell'>{item.sales}</td>
   <td className=''>
    <div className='flex items-center space-x-2'>
     <Link href={`/products/update/${item.id}`} className='p-2 rounded-full border border-gray-300 flex items-center justify-center'><FaEdit/></Link>
    </div>
   </td>
 </tr>)
}

const ProductsPage = async({ searchParams }: { searchParams: Promise<{ search?: string, page?:string }> }) => {
  const {search} =await searchParams || '';
  let {page}=await searchParams 
  if(!page){
    page='1'
  }
  
  const {products:data,totalPages}=await fetchProducts(search,page)
    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
          <div className='flex items-center justify-between'>
            <h1 className='text-base md:text-lg font-semibold'>Products List</h1>
            <div className='flex items-center space-x-3'>
            <TableSearch/>
            <Link href="/products/add" className='border border-gray-300 p-2 rounded-full'>
            <FaPlus/>
            </Link>
            </div>
            
          </div>

          <Table columns={productColumns} renderRow={renderRow} data={data}/>
          <Pagination currentPage={Number(page)} totalPages={totalPages} baseUrl="/products" />
        </div>
      );
}

export default ProductsPage