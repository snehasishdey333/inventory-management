import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
  });
  
export type CategoryInputs = z.infer<typeof categorySchema>;

export const expenseSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
    amount: z
    .string().min(1, "Amount is required"),
    date: z.string().min(1, { message: 'Date is required' }),
  });
  
  export type ExpenseInputs= z.infer<typeof expenseSchema>;
  
  export const incomeSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
    amount: z
    .string().min(1, "Amount is required"),
    date: z.string().min(1, { message: 'Date is required' }),
  });
  
  export type IncomeInputs= z.infer<typeof incomeSchema>;

  export const productSchema = z.object({
    name: z.string().min(1, "Title is required").max(100, "Name must be less than 100 characters"),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
    rating: z.string().min(1, "Rating is required"),
    sales: z.string().min(1, "Sales is required"),
    price: z.string().min(1, "Price is required"),
    units: z.string().min(1, "Units is required"),
    category: z.string().min(1, "Category is required"),
    // image: z
    // .instanceof(FileList) // File input will provide a FileList object
    // .refine((fileList) => {
    //   const file = fileList[0]; // Get the first file
    //   return file && file.type.startsWith('image/');
    // }, { message: "The file must be an image" })
    // image: z.instanceof(File),
  //   image: z.string().min(1, "Image is required"),
  // //   image: z.string().min(1, "Image is required").refine((val) => val.startsWith("data:image/"), {
  // //     message: "The file must be an image",
  // // }),
  // image: z
  //     .instanceof(FileList)
  //     .refine((files) => {
  //       if (!files || files.length === 0) return true; // No image uploaded
  //       return files.length === 1 && ["image/jpeg", "image/png"].includes(files[0]?.type);
  //     }, "Please upload a valid image (JPEG or PNG only)"),
  // image:z.unknown()
  // .refine(
  //   (files)=>isArrayLikeObject(files) && files.length>=1
  // )
  image:z
  .unknown()
  });

  // export const productSchema = z.object({
  //   name: z.string().min(1, "Title is required").max(100, "Name must be less than 100 characters"),
  //   description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  //   rating: z.coerce.number().min(0).max(5, "Rating must be between 0 and 5"),
  //   sales: z.coerce.number().min(0, "Sales must be a positive number"),
  //   price: z.coerce.number().min(0, "Price must be a positive number"),
  //   units: z.coerce.number().min(0, "Units must be a positive number"),
  //   category: z.string().min(1, "Category is required"),
  //   image: z
  //     .instanceof(FileList)
  //     .refine((files) => files.length > 0, "Image is required")
  //     .transform((files) => files[0])
  //     .refine(
  //       (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
  //       "Only .jpg, .png, and .webp formats are supported.",
  //     ),
  // })
  
  export type ProductInputs= z.infer<typeof productSchema>;


  export const staffSchema = z.object({
      name: z.string().optional(),
      phone: z.string().optional(),
      sex:z.string().optional(),
      address: z.string().optional(),
    });
    

  export type StaffInputs = z.infer<typeof staffSchema>;