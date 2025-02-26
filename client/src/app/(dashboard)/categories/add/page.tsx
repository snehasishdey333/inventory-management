"use client"
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {  CategoryInputs, categorySchema } from '@/utils/schema';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { addCategory } from '@/utils/api';


const AddCategoriesPage = () => {
  
  const router = useRouter();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CategoryInputs>({
      resolver: zodResolver(categorySchema),
    });
  
    const onSubmit: SubmitHandler<CategoryInputs> = async(data) => {
      try {
        const createdCategory = await addCategory({ data });
        toast.success("Category added successfully!");
        router.push("/categories")
      } catch (error) {
        toast.error("Failed to add category");
      }
    };
  
    
    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <h1 className='text-base md:text-lg font-semibold mb-2'>Add Category</h1>
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
            Add
          </button>
        </form>
      </div>
    );
  
}

export default AddCategoriesPage;