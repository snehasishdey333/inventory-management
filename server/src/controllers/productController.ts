import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductsController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const searchQuery = req.query.search as string || '';
      const pageQuery = req.query.page as string || '1';
      const page=Number(pageQuery) || 1
      const pageSize=10
      const skip=(page-1)*pageSize

      const [products, totalCount] = await Promise.all([
        await prisma.product.findMany(
        {
          where: {
            name: {
              contains: searchQuery, // Use `contains` to search for matching category names
              mode: 'insensitive',   // Case-insensitive search
            },
          },
          skip: skip,
          take: pageSize,
        }),
        await prisma.product.count({
          where:{
            name: {
              contains: searchQuery, // Use `contains` to search for matching category names
              mode: 'insensitive',   // Case-insensitive search
            },
          },
        })
    ])
      const totalPages = Math.ceil(totalCount / pageSize)
      res.json({products,totalPages});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving products" });
    }
  };

  export const getProductController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {id}=req.params
      const product = await prisma.product.findUnique(
        {where:{id:id}}
      );
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving product" });
    }
  };

  export const addProductController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      
      const { 
        name,
        description,
        rating,
        sales,
        price,
        units,
        category,
        image } = req.body;
      const newProduct = await prisma.product.create({
        data: {
        name:name,
        description:description,
        rating:Number(rating),
        sales:Number(sales),
        price:Number(price),
        units:Number(units),
        category:category,
        image:image
        },
      });
      res.json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving products" });
    }
  };

  export const updateProductWithImageController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params; 
      const { 
        name,
        description,
        rating,
        sales,
        price,
        units,
        category,
        image } = req.body;
      const newProduct = await prisma.product.update({
        where: { id: id },
        data: {
        name:name,
        description:description,
        rating:Number(rating),
        sales:Number(sales),
        price:Number(price),
        units:Number(units),
        category:category,
        image:image
        },
      });
      res.json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating products" });
    }
  };

  export const updateProductWithoutImageController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      
      const { id } = req.params; 
      const product = await prisma.product.findUnique(
        {where:{id:id}}
      );
      if(!product){
        res.json({message:"No product found!"})
      }
      const imageUrl=product?.image
      const { 
        name,
        description,
        rating,
        sales,
        price,
        units,
        category,
         } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: id },
        data: {
        name:name,
        description:description,
        rating:Number(rating),
        sales:Number(sales),
        price:Number(price),
        units:Number(units),
        category:category,
        image:imageUrl
        },
      });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating products" });
    }
  };


  export const deleteProductController = async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const { id } = req.params; 
    
    
      try {
        
        const deletedProduct = await prisma.product.delete({
          where: { id: id }, 
        });
    
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
      } catch (error) {
        
        res.status(404).json({ message: 'Product not found' });
      }
    };