"use client"
import { addImageToS3, deleteProduct, fetchCategoriesWithoutParamas, updateProductWithImage, updateProductWithoutImage } from '@/utils/api';
import { ProductInputs, productSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

// const categoryList = ["Electronics", "Home Decor", "Utensils", "Kitchen"];

const ProductUpdateForm = ({data}:{data:{id:string,name:string,description:string,rating:string,sales:string,price:string,units:string,category:string,image:string}}) => {
    // const [categorySearch, setCategorySearch] = useState<string>("");
    // const [filteredCategories, setFilteredCategories] = useState<string[]>(categoryList);
    // const [selectedCategory, setSelectedCategory] = useState<string>(""); // Store the selected category
    const [categorySearch, setCategorySearch] = useState<string>("");
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(data.category); // Store the selected category
    const [categories, setCategories] = useState<string[]>([]);  // Store the selected category
    const router=useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductInputs>({
        resolver: zodResolver(productSchema),
        defaultValues:{
            name:data.name || "",
            description:data.description || "",
            rating:data.rating.toString() || "",
            sales:data.sales.toString() || "",
            price:data.price.toString() || "",
            units:data.units.toString() || "",
            category:data.category.toString() || "",
            image: undefined
        }
    });

    

    useEffect(() => {
            // Fetch categories from an API
            const getCategories = async () => {
                try {
                    
                    const categoriesData=await fetchCategoriesWithoutParamas()
                   
                    const categoryNames = categoriesData.categories.map((c:{id:string,name:string}) => c.name);
    
                    // Set the state with the extracted names (array of strings)
                    setCategories(categoryNames);
                    setFilteredCategories(categoryNames);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            };
            
            getCategories();
        }, []);      

    const onSubmit: SubmitHandler<ProductInputs> = async(prodData) => {
        // console.log("Form submitted successfully:", prodData);
        const imageFile = (prodData.image as FileList).length > 0 ? (prodData.image as FileList)[0] : null
        
        let imageUrl;
        if(imageFile){
           
            const formData = new FormData();
            formData.append("file", imageFile)
            
            try{
                imageUrl=await addImageToS3(formData)
                
                try{
                   await updateProductWithImage({
                        data: {
                            id:data.id,
                            name: prodData.name,
                            description: prodData.description,
                            rating: prodData.rating,
                            sales: prodData.sales,
                            price: prodData.price,
                            units: prodData.units,
                            category: prodData.category,
                            image: imageUrl
                        }
                })
                   toast.success("Product updated successfully!");
                    router.push("/products")
                }
                catch(error){
                    console.log(error)
                    toast.error("Failed to update product!");
                }
            }
            catch(error){
                console.log(error)
                toast.error("Failed to upload image!");
            }
        }
        else{
            
            try{
                await updateProductWithoutImage({
                     data: {
                        id:data.id,
                         name: prodData.name,
                         description: prodData.description,
                         rating: prodData.rating,
                         sales: prodData.sales,
                         price: prodData.price,
                         units: prodData.units,
                         category: prodData.category,
                     }
             })
                toast.success("Product updated successfully!");
                 router.push("/products")
             }
             catch(error){
                 console.log(error)
                 toast.error("Failed to update product!");
             }
        }        
                
    };


    const handleDelete=async()=>{
            try{
              await deleteProduct({data:{id:data.id}})
              toast.success("Product deleted successfully!");
              router.push("/products")
            }
            catch(error){
                console.log(error)
                toast.error("Failed to delete product");
            }
          }

    const handleCategorySearch = (e: ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            setCategorySearch(query);
            if (query) {
                const filtered = categories.filter((category) =>
                    category.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredCategories(filtered);
            } else {
                setFilteredCategories(categories);
            }
        };
    
        // Handle category selection (only one can be selected)
        const handleCategorySelect = (category: string) => {
            setSelectedCategory(category);
            setValue("category", category); // Update form state with the selected category
            setCategorySearch(""); // Clear the search input
            setFilteredCategories([]); // Clear the suggestions
        };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className='w-full flex items-center justify-between'>
            <h1 className='text-base md:text-lg font-semibold mb-2'>Update Product</h1>
            <button onClick={handleDelete} className='p-2 rounded-full border border-gray-300 flex items-center justify-center'><MdDelete/></button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Title Field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {/* Price Field */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            id="price"
                            type="number"
                            {...register("price")}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>
                    
                    {/* Rating Field */}
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                        <input
                            id="rating"
                            type="number"
                            {...register("rating")}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                    </div>

                    {/* Sales Field */}
                    <div className="mb-4">
                        <label htmlFor="sales" className="block text-sm font-medium text-gray-700">Sales</label>
                        <input
                            id="sales"
                            type="number"
                            {...register("sales")}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.sales && <p className="text-red-500 text-sm mt-1">{errors.sales.message}</p>}
                    </div>

                    {/* Units Field */}
                    <div className="mb-4">
                        <label htmlFor="units" className="block text-sm font-medium text-gray-700">Units</label>
                        <input
                            id="units"
                            type="number"
                            {...register("units")}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.units && <p className="text-red-500 text-sm mt-1">{errors.units.message}</p>}
                    </div>
                </div>


                  {/* Category Search Bar */}
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="category"
                            value={categorySearch}
                            onChange={handleCategorySearch}
                            placeholder="Search for category (e.g., Electronics)"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {categorySearch && (
                            <ul className="mt-2 border border-gray-300 rounded-md bg-white max-h-40 overflow-y-auto">
                                {filteredCategories.map((category: string) => (
                                    <li
                                        key={category}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleCategorySelect(category)} // Select the category
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Display selected category */}
                    {selectedCategory && (
                        <div className="flex items-center gap-2 mt-2">
                            <span className="px-3 py-2 bg-gray-200 rounded-md">{selectedCategory}</span>
                        </div>
                    )}

                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                {/* Image Selection */}
                <div className="">
          <label className="text-sm font-medium text-gray-700" htmlFor="image">
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="ring-1 ring-gray-300 p-3 rounded-md text-sm w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("image")}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

                {/* Submit Button */}
                
                    <button
                        type="submit"
                        className="w-full mt-4 bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
                    >
                        Update
                    </button>
               
            </form>
        </div>
  )
}

export default ProductUpdateForm