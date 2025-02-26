
import Link from 'next/link';
import React from 'react'
import { FaBox, FaChartPie, FaCog, FaMoneyBillWave, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { FaBoxArchive, FaBoxOpen } from "react-icons/fa6";
import { MdMoney } from 'react-icons/md';

const Sidebar = () => {
    

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-18 md:w-64 bg-gray-900 text-white p-3 md:p-5 space-y-4">
         
          <div className=' flex flex-col items-start gap-2 w-full'>
            <Link href="/dashboard" className="w-full rounded-md flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-700"> <FaChartPie size={18}/> <span className='hidden md:block'>Dashboard</span> </Link>
            <Link href="/inventory" className="w-full rounded-md flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-700" > <FaBox size={18}/> <span className='hidden md:block'>Inventory</span> </Link>
            <Link href="/products" className="w-full rounded-md flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-700"> <FaShoppingCart size={18}/> <span className='hidden md:block'>Products</span> </Link>
            <Link href="/categories" className="w-full rounded-md flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-700"> <FaBoxArchive size={18}/> <span className='hidden md:block'>Categories</span> </Link>
            <Link href="/staffs" className="w-full rounded-md flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-700"> <FaUsers size={18}/> <span className='hidden md:block'>Staffs</span> </Link>
            <Link href="/incomes" className="w-full rounded-md flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-700"> <MdMoney size={18}/> <span className='hidden md:block'>Incomes</span> </Link>
            <Link href="/expenses" className="w-full rounded-md flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-700"> <FaMoneyBillWave size={18}/> <span className='hidden md:block'>Expenses</span> </Link>
            <Link href="/settings" className="w-full rounded-md flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-700"> <FaCog size={18}/> <span className='hidden md:block'>Settings</span> </Link>
          </div>
        </div>
       
      </div>
    );
}

export default Sidebar