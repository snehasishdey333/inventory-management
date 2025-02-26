import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getIncomesController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const searchQuery = req.query.search as string || '';
      const pageQuery = req.query.page as string || '1';
      const page=Number(pageQuery) || 1
      const pageSize=10
      const skip=(page-1)*pageSize

      const [incomes, totalCount] = await Promise.all([
        await prisma.income.findMany(
        {
          where: {
            title: {
              contains: searchQuery, // Use `contains` to search for matching category names
              mode: 'insensitive',   // Case-insensitive search
            },
          },
          skip: skip,
          take: pageSize,
        }
      ),
      await prisma.income.count({
        
          where: {
            title: {
              contains: searchQuery, // Use `contains` to search for matching category names
              mode: 'insensitive',   // Case-insensitive search
            },
          },
        
      })
    ])
      const totalPages = Math.ceil(totalCount / pageSize)
      res.json({incomes,totalPages});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving incomes" });
    }
};

export const getIncomeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  const { id } = req.params; 
  const income = await prisma.income.findUnique(
    {where:{id:id}}
  );
  res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving income" });
  }
};

  export const addIncomeController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      
      const { title,description,date,amount } = req.body;
      const newIncome = await prisma.income.create({
        data: {
          title:title.trim(),
          description:description,
          date:date,
          amount:Number(amount)
        },
      });
  
      res.status(201).json(newIncome);
    } catch (error) {
      res.status(500).json({ message: "Error adding income" });
    }
  };

  export const updateIncomeController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params; 
    const { title,description,amount,date } = req.body; 
  
  
    try {
      
      const updatedIncome = await prisma.income.update({
        where: { id: id }, 
        data: { title:title.trim(),
          description:description,
          date:date,
          amount:Number(amount)
         }, 
      });
  
      
      res.status(200).json(updatedIncome);
    } catch (error) {
      res.status(403).json({ message: 'Failed to update income' });
    }
  };


 export const deleteIncomeController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params; 
  
  
    try {
      
      const deletedIncome = await prisma.income.delete({
        where: { id: id }, 
      });
  
      res.status(200).json({ message: 'Income deleted successfully', category: deletedIncome });
    } catch (error) {
      
      res.status(404).json({ message: 'Income not found' });
    }
  };


