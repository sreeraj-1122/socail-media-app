import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './utils/db.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoute.js'

//app config
const app = express()
const PORT=4000

//middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser());


//db connection
connectDB();

//API endpoints

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API working")
})
app.listen(PORT,()=>console.log(`Server is started on ${PORT}`))