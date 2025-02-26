import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategoriesController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const searchQuery = req.query.search as string || '';
      const pageQuery = req.query.page as string || '1';
      const page=Number(pageQuery) || 1
      const pageSize=10
      const skip=(page-1)*pageSize
      

      const [categories, totalCount] = await Promise.all([
        prisma.category.findMany({
          where: {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          skip: skip,
          take: pageSize,
        }),
        prisma.category.count({
          where: {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        }),
      ])

      const totalPages = Math.ceil(totalCount / pageSize)

      res.status(200).json({categories,totalPages});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving categories" });
    }
  };

  export const getCategoryWithourParamsController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving categories" });
    }
  };

  export const getCategoryController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params; 
      const category = await prisma.category.findUnique(
        {where:{id:id}}
      );
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving categories" });
    }
  };


  export const addCategoriesController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      
      const { name } = req.body;
      const newCategory = await prisma.category.create({
        data: {
          name: name.trim(),
        },
      });
  
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving categories" });
    }
  };

  export const updateCategoryController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params; 
    const { name } = req.body; 
  
  
    try {
      
      const updatedCategory = await prisma.category.update({
        where: { id: id }, 
        data: { name: name.trim() }, 
      });
  
      // console.log(updatedCategory)
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(403).json({ message: 'Failed to update category' });
    }
  };


  export const deleteCategoryController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params; 
  
  
    try {
      
      const deletedCategory = await prisma.category.delete({
        where: { id: id }, 
      });
  
      res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
    } catch (error) {
      
      res.status(404).json({ message: 'Category not found' });
    }
  };