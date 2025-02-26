"use client"

import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Define TypeScript types for the income data and chart data
interface IncomeData {
  id: number;
  date: string;
  title: string;
  amount: number;
  description: string;
}

interface ChartData {
  month: string;
  income: number;
}

// const data:ChartData[]=[
//   {
//       "month": "2025-01",
//       "income": 78000
//   },
//   {
//       "month": "2025-02",
//       "income": 72000
//   },
//   {
//       "month": "2025-03",
//       "income": 54000
//   },
//   {
//       "month": "2025-04",
//       "income": 70000
//   },
//   {
//       "month": "2025-05",
//       "income": 45000
//   },
//   {
//       "month": "2025-06",
//       "income": 60000
//   },
//   {
//       "month": "2025-07",
//       "income": 35000
//   },
//   {
//       "month": "2025-08",
//       "income": 35000
//   }
// ]



// Function to prepare the chart data by grouping income data by month
// const prepareData = (data: IncomeData[]): ChartData[] => {
//     const monthlyIncome = data.reduce((acc: { [key: string]: number }, item: IncomeData) => {
//       const month = item.date.substring(0, 7); // Extract 'YYYY-MM' format
//       if (!acc[month]) {
//         acc[month] = 0;
//       }
//       acc[month] += item.amount; // Sum the amounts
//       return acc;
//     }, {});
  
//     // Convert the object into an array and sort by month (from past to most recent)
//     return Object.keys(monthlyIncome)
//       .sort() // This will sort by 'YYYY-MM' format in ascending order
//       .map((month) => ({
//         month,
//         income: monthlyIncome[month],
//       }));
//   };
  
  const SalesChart = ({data}:{data:ChartData[]}) => {
    // Prepare chart data
    // const chartData: ChartData[] = prepareData(incomeData);
    // const chartData=data
  
    return (
      <div className='bg-white rounded-xl w-full h-full p-3 shadow-md'>
        <h1 className="text-lg font-semibold">Sales Chart</h1>
        <div className='h-[250px] w-full'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  };

export default SalesChart;
