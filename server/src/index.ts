import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'


// ROUTE IMPORTS
import productRoutes from "./routes/products";
import incomeRoutes from './routes/incomes'
import expenseRoutes from './routes/expenses'
import staffRoutes from './routes/staffs'
import categoryRoutes from './routes/categories'
import dashboardRoutes from './routes/dashboard'
import inventoryRoutes from './routes/inventory'
import imageUploadRoute from './routes/image-upload'

// CONFIGURATIONS
dotenv.config()
const app=express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

// ROUTES
app.get("/",(req,res)=>{
    // curl http://localhost:8000
    res.send("hello world!")
})

app.use("/products", productRoutes);
app.use("/incomes", incomeRoutes);
app.use("/expenses", expenseRoutes);
app.use("/staffs", staffRoutes);
app.use("/categories", categoryRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/upload-image", imageUploadRoute);


// SERVER
const port=Number(process.env.PORT) || 3001
app.listen(port,"0.0.0.0",()=>{
    console.log(`Server running on port ${port}`)
})




