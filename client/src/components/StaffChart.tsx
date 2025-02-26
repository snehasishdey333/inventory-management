"use client"
import { useState, useEffect } from 'react';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Data for PieChart - Number of staff
const genderData = [
  { name: "Male", value: 35 },
  { name: "Female", value: 32 },
  { name: "Others", value: 8 }
];

type GenderType={
  nmae:string,
  value:number
}

// Color palette for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const StaffChart = ({data}:{data:GenderType[]}) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure that the component only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a loading state or nothing before the component is mounted on the client
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl w-full h-[300px] p-3 shadow-md">
      <h1 className="text-lg font-semibold">Staff Chart</h1>
      <div className='w-full h-[250px] flex items-center justify-center'>
        {/* Pie chart container */}
        <PieChart width={250} height={250}>
          <Pie
            data={genderData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}  // Reduced to make the pie chart smaller
            label
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default StaffChart;
