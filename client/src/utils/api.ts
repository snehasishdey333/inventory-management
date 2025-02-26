


import apiClient from "./apiService";



export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// utils/api.ts


// Define types for the data passed to the API functions
interface StaffData {
  cognitoId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  username: string;
}

// Fetch staff data
export const fetchStaff = async ({ data }: { data: { cognitoId: string } }) => {
  try {
    const response = await apiClient.post('/staffs', data); // Replace with your actual API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw new Error('Failed to fetch staff');
  }
};

// Create staff if they do not exist
export const createStaffInNotExist = async ({ data }: { data: StaffData }) => {
  try {
    const response = await apiClient.post('/staffs/create', data); // Replace with your actual API endpoint
    return response.data;
  } catch (error) {
    console.error('Error creating staff:', error);
    throw new Error('Failed to create staff');
  }
};




export const fetchProducts=async(searchQuery: string = '',pageQuery:string = '1')=>{
    try{
    if (!apiUrl) {
        throw new Error("API is not working");
    }
    
    
    const response = await apiClient.get(apiUrl+`/products?search=${searchQuery}&page=${pageQuery}`,
    );
    return response.data
    } catch (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
    }
}

export const fetchProduct=async({data}:{data:{id:string}})=>{
    try{
    if (!apiUrl) {
        throw new Error("API is not working");
    }
    const response = await apiClient.get(apiUrl+`/products/${data.id}`);
    return response.data
    } catch (error) {
    console.error("Error fetching product:", error)
    throw new Error("Failed to fetch product")
    }
}

export const addProduct=async({data}:{data:{name:string,
    description:string,
    rating:string,
    sales: string,
    price: string,
    units: string,
    category:  string,
    image:string}})=>{
    try{
    if (!apiUrl) {
        throw new Error("API is not working");
    }
  
    const response = await apiClient.post(apiUrl+"/products",{name:data.name,description:data.description,rating:data.rating,sales:data.sales,
        price:data.price,
        units:data.units,
        category:data.category,
        image:data.image});
 
    return response.data
    } catch (error) {
    console.error("Error adding product:", error)
    throw new Error("Failed to add product")
    }
}



export const updateProductWithImage=async({data}:{data:{id:string,name:string,
    description:string,
    rating:string,
    sales: string,
    price: string,
    units: string,
    category:  string,
    image:string}})=>{
    try{
    if (!apiUrl) {
        throw new Error("API is not working");
    }
    
    const response = await apiClient.put(apiUrl+`/products/image/${data.id}`,{name:data.name,description:data.description,rating:data.rating,sales:data.sales,
        price:data.price,
        units:data.units,
        category:data.category,
        image:data.image});
    
    return response.data
    } catch (error) {
    console.error("Error updating product:", error)
    throw new Error("Failed to update product")
    }
}

export const updateProductWithoutImage=async({data}:{data:{id:string,name:string,
    description:string,
    rating:string,
    sales: string,
    price: string,
    units: string,
    category:  string,
    }})=>{
    try{
    if (!apiUrl) {
        throw new Error("API is not working");
    }
    
    const response = await apiClient.put(apiUrl+`/products/${data.id}`,{name:data.name,description:data.description,rating:data.rating,sales:data.sales,
        price:data.price,
        units:data.units,
        category:data.category,
        });
    
    return response.data
    } catch (error) {
    console.error("Error updating product:", error)
    throw new Error("Failed to update product")
    }
}

export const deleteProduct=async({data}:{data:{id:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.delete(apiUrl+`/products/${data.id}`);
        return response.data
    }
    catch(error){
    console.error("Error deleting product", error)
    throw new Error("Failed to delete product")
    }
}

export const fetchIncomes=async(searchQuery: string = '',pageQuery:string = '1')=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.get(apiUrl+`/incomes?search=${searchQuery}&page=${pageQuery}`);
        return response.data
    }
    catch(error){
    console.error("Error fetching incomes:", error)
    throw new Error("Failed to fetch incomes")
    }
}

export const fetchIncome=async({data}:{data:{id:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        
        const response = await apiClient.get(apiUrl+`/incomes/${data.id}`);
        
        return response.data
    }
    catch(error){
    console.error("Error fetching expense:", error)
    throw new Error("Failed to fetch expense")
    }
}

export const addIncome=async({data}:{data:{title:string,description:string,date:string,amount:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        
        const response = await apiClient.post(apiUrl+"/incomes",{title:data.title,description:data.description,amount:data.amount,date:data.date});
        return response.data
    }
    catch(error){
    console.error("Error adding expense", error)
    throw new Error("Failed to add expense")
    }
}

export const updateIncome=async({data}:{data:{id:string,title:string,description:string,date:string,amount:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.put(apiUrl+`/incomes/${data.id}`,{title:data.title,description:data.description,amount:data.amount,date:data.date});
        return response.data
    }
    catch(error){
    console.error("Error updating expense", error)
    throw new Error("Failed to update expense")
    }
}

export const deleteIncome=async({data}:{data:{id:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.delete(apiUrl+`/incomes/${data.id}`);
        return response.data
    }
    catch(error){
    console.error("Error deleting expense", error)
    throw new Error("Failed to delete expense")
    }
}

export const fetchExpenses=async(searchQuery: string = '',pageQuery:string = '1')=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.get(apiUrl+`/expenses?search=${searchQuery}&page=${pageQuery}`);
        return response.data
    }
    catch(error){
    console.error("Error fetching expenses:", error)
    throw new Error("Failed to fetch expenses")
    }
}

export const fetchExpense=async({data}:{data:{id:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        
        const response = await apiClient.get(apiUrl+`/expenses/${data.id}`);
        
        return response.data
    }
    catch(error){
    console.error("Error fetching expense:", error)
    throw new Error("Failed to fetch expense")
    }
}

export const addExpense=async({data}:{data:{title:string,description:string,date:string,amount:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        
        const response = await apiClient.post(apiUrl+"/expenses",{title:data.title,description:data.description,amount:data.amount,date:data.date});
        return response.data
    }
    catch(error){
    console.error("Error adding expense", error)
    throw new Error("Failed to add expense")
    }
}

export const updateExpense=async({data}:{data:{id:string,title:string,description:string,date:string,amount:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.put(apiUrl+`/expenses/${data.id}`,{title:data.title,description:data.description,amount:data.amount,date:data.date});
        return response.data
    }
    catch(error){
    console.error("Error updating expense", error)
    throw new Error("Failed to update expense")
    }
}

export const deleteExpense=async({data}:{data:{id:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.delete(apiUrl+`/expenses/${data.id}`);
        return response.data
    }
    catch(error){
    console.error("Error deleting expense", error)
    throw new Error("Failed to delete expense")
    }
}

export const fetchStaffs=async(searchQuery: string = '',pageQuery:string = '1')=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.get(apiUrl+`/staffs?search=${searchQuery}&page=${pageQuery}`);
        return response.data
    }
    catch(error){
    console.error("Error fetching staffs:", error)
    throw new Error("Failed to fetch staffs")
    }
}

// export const fetchStaff=async({data}:{data:{cognitoId:string}})=>{
//     try{
//         if (!apiUrl) {
//             throw new Error("API is not working");
//         }
//         const response = await apiClient.get(apiUrl+`/staffs/${data.cognitoId}`);
//         return response.data
//     }
//     catch(error){
//     console.error("Error fetching staff:", error)
//     throw new Error("Failed to fetch staff")
//     }
// }

export const updateStaff=async({data}:{data:{id:string,name:string,address:string,sex:string,phone:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.put(apiUrl+`/staffs/${data.id}`,{
            name:data.name,
            address:data.address,
            sex:data.sex,
            phone:data.phone
        });
        return response.data
    }
    catch(error){
    console.error("Error fetching staffs:", error)
    throw new Error("Failed to fetch staffs")
    }
}

export const fetchCategories=async(searchQuery: string = '',pageQuery:string = '1')=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        // `/api/categories?search=${encodeURIComponent(searchQuery)}`
        const response = await apiClient.get(apiUrl+`/categories?search=${searchQuery}&page=${pageQuery}`);
        return response.data
    }
    catch(error){
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
    }
}

export const fetchCategoriesWithoutParamas=async()=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
       
        const response = await apiClient.get(apiUrl+'/categories/no-params');
        return response.data
    }
    catch(error){
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
    }
}

export const fetchCategory=async({data}:{data:{id:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.get(apiUrl+`/categories/${data.id}`);
        return response.data
    }
    catch(error){
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
    }
}

export const fetchDashboardData=async()=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.get(apiUrl+"/dashboard");
        return response.data
    }
    catch(error){
    console.error("Error fetching dashboard:", error)
    throw new Error("Failed to fetch dashboard")
    }
}

export const fetchInventory=async(searchQuery: string = '',pageQuery:string = '1')=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        
        const response = await apiClient.get(apiUrl+`/inventory?search=${searchQuery}&page=${pageQuery}`);
        return response.data
    }
    catch(error){
    console.error("Error fetching inventory:", error)
    throw new Error("Failed to fetch inventory")
    }
}

export const addCategory=async({data}:{data:{name:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.post(apiUrl+"/categories",{name:data.name});
        return response.data
    }
    catch(error){
    console.error("Error adding category", error)
    throw new Error("Failed to add category")
    }
}

export const updateCategory=async({data}:{data:{id:string,name:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.put(apiUrl+`/categories/${data.id}`,{name:data.name});
        return response.data
    }
    catch(error){
    console.error("Error adding category", error)
    throw new Error("Failed to add category")
    }
}

export const deleteCategory=async({data}:{data:{id:string}})=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.delete(apiUrl+`/categories/${data.id}`);
        return response.data
    }
    catch(error){
    console.error("Error adding category", error)
    throw new Error("Failed to add category")
    }
}

export const addImageToS3=async(formData:FormData)=>{
    try{
        if (!apiUrl) {
            throw new Error("API is not working");
        }
        const response = await apiClient.post(apiUrl+"/upload-image",formData);
        console.log(response.data)
        return response.data
    }
    catch(error){
    console.error("Error adding category", error)
    throw new Error("Failed to add category")
    }
}

// export const fetchAuthUserInfo=async()=>{
//     try{
//         if (!apiUrl) {
//             throw new Error("API is not working");
//         }
//         let session = await fetchAuthSession()
        
//         // console.log(session)
//         const {idToken}=session.tokens ?? {}
//         // const user=await getCurrentUser()
        
//         return {
            
//             session,
//             idToken
//         }
//     }
//     catch(error){
//         console.error("Error fetching user info", error)
//         throw new Error("Failed to fetch user info")
//     }
// }

// export const createStaffInNotExist=async({data}:{data:{cognitoId:string,username:string,email:string}})=>{
//     try{
//         if (!apiUrl) {
//             throw new Error("API is not working");
//         }
//         const response = await apiClient.post(apiUrl+"/staffs",{
//             name:"",
//             address:"",
//             cognitoId:data.cognitoId,
//             phone:"",
//             email:data.email,
//             username:data.username
//         })
//         console.log(response.data)
//         return response.data
//     }
//     catch(error){
//        console.log("error creating staff",error)
//     }
// }

// export const staffChartData=async()=>{
//     try{
//         if (!apiUrl) {
//             throw new Error("API is not working");
//         }
//         const response = await apiClient.get(apiUrl+"/staffs/chart");
//         console.log(response.data)
//         return response.data
//     }
//     catch(error){
//         console.log('Error getting staff chart data, error',error)
//     }
// }
