"use client";


// import { aggregateIncomeAndExpenseDataAndConvertToGraph, expenseData, incomeData } from "@/data/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const result = aggregateIncomeAndExpenseDataAndConvertToGraph(incomeData, expenseData);
// console.log(result);

type FinanceData={
  name:string,
  income:number,
  expense:number
}

// const data = [
//   {
//     name: "Jan",
//     income: 4000,
//     expense: 2400,
//   },
//   {
//     name: "Feb",
//     income: 3000,
//     expense: 1398,
//   },
//   {
//     name: "Mar",
//     income: 2000,
//     expense: 9800,
//   },
//   {
//     name: "Apr",
//     income: 2780,
//     expense: 3908,
//   },
//   {
//     name: "May",
//     income: 1890,
//     expense: 4800,
//   },
//   {
//     name: "Jun",
//     income: 2390,
//     expense: 3800,
//   },
//   {
//     name: "Jul",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Aug",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Sep",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Oct",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Nov",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Dec",
//     income: 3490,
//     expense: 4300,
//   },
// ];

const FinanceChart = ({data}:{data:FinanceData[]}) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-3 shadow-md">
      
        <h1 className="text-lg font-semibold">Finance</h1>
       
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#000000" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#000000" }} tickLine={false}  tickMargin={20}/>
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#0000FF"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="expense" stroke="#808080" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;