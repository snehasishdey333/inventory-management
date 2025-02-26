"use client"
import { deleteCategory, updateCategory } from '@/utils/api';
import {  CategoryInputs, categorySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const CategoryUpdateForm = ({data}:{data:{id:string,name:string}}) => {
    
    const router=useRouter()

   const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<CategoryInputs>({
        resolver: zodResolver(categorySchema),
        defaultValues:{
            name:data.name || ""
        }
      });
    
      const onSubmit: SubmitHandler<CategoryInputs> = async(catData) => {
        try {
          const newData={...catData,id:data.id}
          await updateCategory({ data:newData });
          toast.success("Category updated successfully!");
          router.push("/categories")
        } catch (error) {
          toast.error("Failed to update category");
        }
      };  

      const handleDelete=async()=>{
        try{
          await deleteCategory({data:{id:data.id}})
          toast.success("Category deleted successfully!");
          router.push("/categories")
        }
        catch(error){
            toast.error("Failed to delete category");
        }
      }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className='w-full flex items-center justify-between'>
            <h1 className='text-base md:text-lg font-semibold mb-2'>Update Category</h1>
            <button onClick={handleDelete} className='p-2 rounded-full border border-gray-300 flex items-center justify-center'><MdDelete/></button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category name:</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              placeholder="Enter category name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
  
         

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
          >
            Update
          </button>
        </form>
      </div>
  )
}

export default CategoryUpdateForm