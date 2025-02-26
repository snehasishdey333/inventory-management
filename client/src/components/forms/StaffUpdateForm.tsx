"use client"
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StaffInputs, staffSchema } from '@/utils/schema';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { updateStaff } from '@/utils/api';
import { signOut } from 'aws-amplify/auth';

const StaffUpdateForm = ({data}:{data:{ id: string; name: string; username: string; cognitoId: string; email: string; address: string; phone: string;sex:string }}) => {
  const router=useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffInputs>({
    resolver: zodResolver(staffSchema),
    defaultValues:{
      name:data.name || '',
      phone:data.phone || '',
      address:data.address || '',
      sex:data.sex || ''
    }
  });

  const onSubmit: SubmitHandler<StaffInputs> = async(updatedData) => {
          try {
                    const newData={id:data.id,name:updatedData.name!,phone:updatedData.phone!,address:updatedData.address!,sex:updatedData.sex!}
                    const updatedStaff = await updateStaff({ data:newData });
                    toast.success("Staff updated successfully!");
                    router.push("/staffs")
                  } catch (error) {
                    toast.error("Failed to update staff");
                  }
  };

  const handleLogout = async() => {
    console.log('Logged out');
    await signOut();
    // window.location.href = "/";
  };
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <h1 className='text-base md:text-lg font-semibold mb-2'>Update Staff Information</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              placeholder="Enter your name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
  
          {/* Phone Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              placeholder="Enter your phone number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
  
          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
            <textarea
              id="address"
              {...register('address')}
              placeholder="Enter your address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Sex Dropdown Field */}
          <div className="mb-4">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex:</label>
            <select
              id="sex"
              {...register('sex')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>}
          </div>
  
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
          >
            Update
          </button>
        </form>
  
        <button
          onClick={handleLogout}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none"
        >
          Logout
        </button>
      </div>
  )
}

export default StaffUpdateForm