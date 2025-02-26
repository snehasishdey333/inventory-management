"use client"
import { FinanceItem } from '@/data/data';
import { deleteExpense, updateExpense } from '@/utils/api';
import { ExpenseInputs, expenseSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const ExpenseUpdateForm = ({data}:{data:FinanceItem}) => {
    const router=useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<ExpenseInputs>({
        resolver: zodResolver(expenseSchema),
        defaultValues:{
            // id:data.id || "",
            date:data.date || "",
            title:data.title || "",
            amount:data.amount ? data.amount.toString() : "",
            description:data.description || "",
        }
      });
    
      const onSubmit: SubmitHandler<ExpenseInputs> = async(expenseData) => {
        try {
                  const newData={...expenseData,id:data.id}
                  await updateExpense({ data:newData });
                  toast.success("Expense updated successfully!");
                  router.push("/expenses")
                } catch (error) {
                  console.log(error)
                  toast.error("Failed to update expense");
                }
      };

      const handleDelete=async()=>{
        try{
            await deleteExpense({data:{id:data.id}})
            toast.success("Expense deleted successfully!");
            router.push("/expenses")
          }
          catch(error){
              console.log(error)
              toast.error("Failed to delete expense");
          }
        }     

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className='w-full flex items-center justify-between'>
            <h1 className='text-base md:text-lg font-semibold mb-2'>Update Expense</h1>
            <button onClick={handleDelete} className='p-2 rounded-full border border-gray-300 flex items-center justify-center'><MdDelete/></button>
        </div>
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
        
        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register("description")}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        
        {/* Amount Field */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            id="amount"
            type="number"
            {...register("amount")}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
        </div>

        {/* Date Field */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            id="date"
            type="date"
            {...register("date")}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
        <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExpenseUpdateForm

// import { FinanceItem } from '@/data/data'
// import React from 'react'

// const ExpenseUpdateForm = () => {
//   return (
//     <div>ExpenseUpdateForm</div>
//   )
// }

// export default ExpenseUpdateForm