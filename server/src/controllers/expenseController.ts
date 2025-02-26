import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const searchQuery = req.query.search as string || '';
      const pageQuery = req.query.page as string || '1';
      const page=Number(pageQuery) || 1
      const pageSize=10
      const skip=(page-1)*pageSize

      const [expenses, totalCount]  =await Promise.all([
         await prisma.expense.findMany({
        where: {
          title: {
            contains: searchQuery, // Use `contains` to search for matching category names
            mode: 'insensitive',   // Case-insensitive search
          },
        },
        skip: skip,
        take: pageSize,
      }),
      await prisma.expense.count({
        where: {
          title: {
            contains: searchQuery, // Use `contains` to search for matching category names
            mode: 'insensitive',   // Case-insensitive search
          },
        },
      })
    ])
      const totalPages = Math.ceil(totalCount / pageSize)
      res.json({expenses,totalPages});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving expenses" });
    }
};

export const getExpenseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  const { id } = req.params; 
  const expense = await prisma.expense.findUnique(
    {where:{id:id}}
  );
  res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses" });
  }
};

  export const addExpenseController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      
      const { title,description,date,amount } = req.body;
      const newExpense = await prisma.expense.create({
        data: {
          title:title.trim(),
          description:description,
          date:date,
          amount:Number(amount)
        },
      });
  
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ message: "Error adding expense" });
    }
  };

  export const updateExpenseController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params; 
    const { title,description,amount,date } = req.body; 
  
  
    try {
      
      const updatedExpense = await prisma.expense.update({
        where: { id: id }, 
        data: { title:title.trim(),
          description:description,
          date:date,
          amount:Number(amount)
         }, 
      });
  
      
      res.status(200).json(updatedExpense);
    } catch (error) {
      res.status(403).json({ message: 'Failed to update expense' });
    }
  };


 export const deleteExpenseController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params; 
  
  
    try {
      
      const deletedExpense = await prisma.expense.delete({
        where: { id: id }, 
      });
  
      res.status(200).json({ message: 'Expense deleted successfully', category: deletedExpense });
    } catch (error) {
      
      res.status(404).json({ message: 'Expense not found' });
    }
  };