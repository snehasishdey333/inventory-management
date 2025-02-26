export const products=[
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Wireless Bluetooth Headphones",
      "description": "Noise-canceling over-ear headphones with deep bass and long battery life.",
      "rating": 4.7,
      "sales": 1520,
      "price": 89.99,
      "units": 250,
      "category":"Electronics",
      "image": "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Smart LED Desk Lamp",
      "description": "Adjustable LED lamp with touch controls and multiple brightness settings.",
      "rating": 4.5,
      "sales": 930,
      "category":"Electronics",
      "price": 34.99,
      "units": 180,
      "image": "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "Ergonomic Office Chair",
      "description": "High-back mesh office chair with lumbar support and adjustable armrests.",
      "rating": 4.6,
      "sales": 670,
      "price": 129.99,
      "units": 75,
      "category":"Furniture",
      "image": "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "Stainless Steel Water Bottle",
      "description": "Double-wall insulated water bottle that keeps drinks cold for 24 hours.",
      "rating": 4.8,
      "sales": 1200,
      "price": 19.99,
      "category":"Stationary",
      "units": 500,
      "image": "https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "name": "Mechanical Gaming Keyboard",
      "description": "RGB backlit mechanical keyboard with customizable keys and fast response time.",
      "rating": 4.9,
      "sales": 2450,
      "price": 79.99,
      "category":"Electronics",
      "units": 320,
      "image": "https://images.pexels.com/photos/265631/pexels-photo-265631.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  ]

export const staffs=[
  {
    username:"Johndoe",
    email:"johndoe@gmail.com",
    name:"John Doe",
    sex:"Male",
    address:"Birpara, Alipurduar, 735204",
    phone:"6765455454"

  },
  {
    username:"Janedoe",
    email:"janedoe@gmail.com",
    name:"Jane Doe",
    sex:"Male",
    address:"Birpara, Alipurduar, 735204",
    phone:"6765455454"
  },
  {
    username:"Johnson",
    email:"johnson@gmail.com",
    name:"Johnson David",
    sex:"Female",
    address:"Birpara, Alipurduar, 735204",
    phone:"6765455454"
  }
]

export const InventoryColumns=[
  
  {
    header:"Category Name",
    accessor:"categoryName",
  },
  {
    header:"Products",
    accessor:"products",
    
  },
  {
    header:"Total Units",
    accessor:"units",
    
  },
  
]

export const productColumns=[
  {
    header:"Info",
    accessor:"info",
    className:""
  },
  {
    header:"Description",
    accessor:"description",
    className:"hidden md:table-cell"
  },
  {
    header:"Price",
    accessor:"price",
    className:"hidden md:table-cell"
  },
  {
    header:"Rating",
    accessor:"rating",
    className:"hidden md:table-cell"
  },
  
  {
    header:"Sales",
    accessor:"sales",
    className:"hidden md:table-cell"
  },
  {
    header: "Actions",
    accessor: "action",
  },
  
]

export const staffsColumns=[
  
  {
    header:"Username",
    accessor:"username",
    className:""
  },

  {
    header:"Name",
    accessor:"name",
    className:""
  },

  {
    header:"Email",
    accessor:"email",
    className:""
  },
  {
    header:"Phone",
    accessor:"phone",
    className:"hidden md:table-cell"
  },
  {
    header:"Sex",
    accessor:"sex",
    className:"hidden md:table-cell"
  },
  {
    header:"Address",
    accessor:"address",
    className:"hidden md:table-cell"
  },
]

export const expenseColumns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Description",
    accessor: "description",
    className:"hidden md:table-cell"
  },
  {
    header: "Amount",
    accessor: "amount",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export const incomeData=[
  {
    id:1,
    date:"2025-02-01",
    title:"Construction",
    amount:5000,
    description:"Fees",
  },
  {
    id:2,
    date:"2025-01-01",
    amount:50000,
    title:"Salary",
    description:"Salary to teachers",
  },
  {
    id:3,
    date:"2025-01-01",
    amount:6000,
    title:"Maintainance",
    description:"Maintainanace for ground",
  },
  {
    id:4,
    date:"2025-03-01",
    amount:6000,
    title:"Electricity",
    description:"Electric bill",
  },
  {
    id:5,
    date:"2025-01-04",
    amount:2000,
    title:"Water",
    description:"Water bill",
  },
  {
    id:6,
    date:"2024-05-01",
    amount:2000,
    title:"Fees",
    description:"Fees",
  },
  {
    id:7,
    date:"2025-01-03",
    amount:5000,
    title:"Other",
    description:"Other expenses",
  },
  
]

export const expenseData=[
  {
    id:1,
    date:"2025-01-01",
    title:"Construction",
    amount:5000,
    description:"Fees",
  },
  {
    id:2,
    date:"2025-01-01",
    amount:50000,
    title:"Salary",
    description:"Salary to teachers",
  },
  {
    id:3,
    date:"2025-01-01",
    amount:6000,
    title:"Maintainance",
    description:"Maintainanace for ground",
  },
  {
    id:4,
    date:"2025-01-01",
    amount:6000,
    title:"Electricity",
    description:"Electric bill",
  },
  {
    id:5,
    date:"2025-01-01",
    amount:2000,
    title:"Water",
    description:"Water bill",
  },
  {
    id:6,
    date:"2025-01-01",
    amount:2000,
    title:"Fees",
    description:"Fees",
  },
  {
    id:7,
    date:"2025-01-01",
    amount:5000,
    title:"Other",
    description:"Other expenses",
  },
  
]
  



export const categoryData=[
  {
    id:"df213f2q",
    name:"Electronics",
  },
  {
    id:"432r13f2q",
    name:"Furniture",
  },
  {
    id:"sdv13f2q",
    name:"Utensils",
  },
  {
    id:"34536y13f2q",
    name:"Cooking",
  },
  {
    id:"er213f2q",
    name:"Education",
  },
]

export const categoryColumns=[
  
  {
    header:"Category Id",
    accessor:"id",
    className:""
  },

  {
    header:"Name",
    accessor:"name",
    className:""
  },

  {
    header:"Actions",
    accessor:"actions",
    className:""
  },
 
]



export const inventoryData=[
  {
    categoryName:"Electronics",
    products:80,
    units:250
  },
  {
    categoryName:"Education",
    products:100,
    units:2500
  },
  {
    categoryName:"Cloth",
    products:50,
    units:25000
  },
  {
    categoryName:"Utensils",
    products:20,
    units:20
  },
  {
    categoryName:"Plastic",
    products:900,
    units:4500
  }
]

export type FinanceItem = {
  id: string;
  date: string;
  title: string;
  amount: number;
  description: string;
};

export type MonthData = {
  name: string;
  income: number;
  expense: number;
};


export function aggregateIncomeAndExpenseDataAndConvertToGraph(incomeData: FinanceItem[], expenseData: FinanceItem[]): MonthData[] {
  // Helper function to get the month name from a Date object
  const getMonthName = (month: number): string => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[month];
  };

  // Helper function to extract the year and month from a date string
  const getYearMonth = (date: string): string => {
    const [year, month] = date.split("-");  // assuming date format is "YYYY-MM-DD"
    return `${year}-${month}`;
  };

  // Initialize an empty map to store income and expense by year-month
  const aggregatedData: { [key: string]: { income: number; expense: number } } = {};

  // Aggregate income data
  incomeData.forEach((item) => {
    const yearMonth = getYearMonth(item.date);
    if (!aggregatedData[yearMonth]) {
      aggregatedData[yearMonth] = { income: 0, expense: 0 };
    }
    aggregatedData[yearMonth].income += item.amount;
  });

  // Aggregate expense data
  expenseData.forEach((item) => {
    const yearMonth = getYearMonth(item.date);
    if (!aggregatedData[yearMonth]) {
      aggregatedData[yearMonth] = { income: 0, expense: 0 };
    }
    aggregatedData[yearMonth].expense += item.amount;
  });

  // Convert the aggregated data into the desired format
  const result: MonthData[] = Object.keys(aggregatedData).map((yearMonth) => {
    const [year, month] = yearMonth.split("-");
    return {
      name: getMonthName(Number(month) - 1),  // Get the month name from the number
      income: aggregatedData[yearMonth].income,
      expense: aggregatedData[yearMonth].expense,
    };
  });

  return result;
}