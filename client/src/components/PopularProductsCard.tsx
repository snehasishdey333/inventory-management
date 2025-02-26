
import Image from 'next/image'
import React from 'react'

type Product = {
  id: string;
  name: string;
  description: string;
  rating: number;
  sales: number;
  price: number;
  units: number;
  category: string; 
  image: string;
};



const PopularProductsCard = ({data}:{data:Product[]}) => {
  return (
    <div className='bg-white rounded-xl w-full p-3 h-[300px] overflow-y-scroll shadow-md'>
      <h1 className="text-lg font-semibold">Popular Products</h1>
      <div className='flex flex-col space-x-2 h-60'>
        {data.map((p) => (
          <div key={p.id} className='p-2 flex items-center space-x-2 border-b border-gray-300'>
            {p.image && <Image src={p.image} className='' alt="" height={48} width={48} />}
            <div>
              <h1 className='font-bold'>{p.name}</h1>
              <p className='text-sm'><span className='font-semibold'>Rating : </span>{p.rating}</p>
              <p className='text-sm'><span className='font-semibold'>Purchased : </span>{p.sales}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularProductsCard
