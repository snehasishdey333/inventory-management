import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const getDashboardDataController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const popularProductsData=await fetchPopularProducts()

      const financeData=await fetchIncomeAndExpenseData()

      const salesData=await fetchSalesData()

      const sexData=await fetchStaffData()

      res.json({
        popularProductsData,
        financeData,
        salesData,
        sexData
      });

    
    } catch (error) {
      res.status(500).json({ message: "Error retrieving dashboard data" });
    }
  };

  async function fetchSalesData() {
    const incomes = await prisma.income.findMany();

    // Aggregate income by month
    const monthlyIncome: { [key: string]: number } = {};

    incomes.forEach((income) => {
      const month = new Date(income.date).toISOString().substring(0, 7); // Format to "YYYY-MM"
      if (!monthlyIncome[month]) {
        monthlyIncome[month] = 0;
      }
      monthlyIncome[month] += income.amount;
    });

    // Prepare the response in the desired format
    const result: {
      month: string;
      income: number;
    }[] = Object.keys(monthlyIncome).map((month) => ({
      month,
      income: monthlyIncome[month],
    }));

    return result
  }


  async function fetchStaffData(){
    const genderData = await prisma.staff.groupBy({
      by: ['sex'],
      _count: true,
    });
    
    const formattedData = genderData.map(item => ({
      name: item.sex,
      value: item._count,
    }));
    return formattedData
  }

  async function fetchPopularProducts() {
    const data=await prisma.product.findMany({
        take: 10,
        orderBy: {
          sales: 'desc',
        },
      });
      return data;
  }


  async function fetchIncomeAndExpenseData(){
    const incomes = await prisma.income.findMany()
    const expenses = await prisma.expense.findMany()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const data = monthNames.map((name, index) => {
      const monthIncome = incomes
        .filter((income) => new Date(income.date).getMonth() === index)
        .reduce((sum, income) => sum + income.amount, 0)

      const monthExpense = expenses
        .filter((expense) => new Date(expense.date).getMonth() === index)
        .reduce((sum, expense) => sum + expense.amount, 0)

      return {
        name,
        income: Math.round(monthIncome),
        expense: Math.round(monthExpense),
      }
    })

    return data;

  }

  