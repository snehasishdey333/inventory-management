
"use client";

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

const TableSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname=usePathname()
  
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`${pathname}/?search=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={handleSearch} className='w-full md:w-auto flex items-center justify-between gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
      <input
        type="text"
        placeholder='Search...'
        className='w-[200px] p-2 bg-transparent outline-none'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className='h-8 w-8'><FaSearch/></button>
    </form>
  );
};

export default TableSearch;