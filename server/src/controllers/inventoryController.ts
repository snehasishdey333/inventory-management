import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getInventoryController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
    const searchQuery = req.query.search as string || '';
    const pageQuery = req.query.page as string || '1';
    const page=Number(pageQuery) || 1
    const pageSize=10
    const skip=(page-1)*pageSize

    
    const [inventoryData, totalCount]=await Promise.all([
      await prisma.product.groupBy({
      by: ['category'],
      where: {
        OR: [
          { category: { contains: searchQuery, mode: 'insensitive' } },
          { name: { contains: searchQuery, mode: 'insensitive' } }
        ]
      },
      _count: {
        category: true, 
      },
      _sum: {
        units: true, 
      },
    }),
    prisma.product.findMany({
      where: {
        OR: [
          { category: { contains: searchQuery, mode: 'insensitive' } },
          { name: { contains: searchQuery, mode: 'insensitive' } }
        ]
      },
      select: {
        category: true
      },
      distinct: ['category']
    })
  ])
    const inventory = inventoryData.map(item => ({
      categoryName: item.category,
      products: item._count.category,
      units: item._sum.units,
    }));

    // Calculate totalCount based on distinct categories
    const totalCategories = totalCount.length;  // totalCount is an array of distinct categories

    // Calculate the total pages
    const totalPages = Math.ceil(totalCategories / pageSize);
  
    res.json({inventory,totalPages});
    
    } catch (error) {
      res.status(500).json({ message: "Error retrieving inventory" });
    }
  };