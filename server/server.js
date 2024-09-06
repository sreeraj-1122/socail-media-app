import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoute.js'
import postRouter from './routes/postRoute.js'
import errorMiddleware from './middlewares/errorMiddleware.js'

//app config
const app = express()
const PORT=4000

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's domain
    credentials: true, // This allows the server to accept cookies from the client
  }));
app.use(cookieParser());
// Serve static files from the 'uploads' directory
app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/videos', express.static('uploads/videos'));
app.use('/uploads/gifs', express.static('uploads/gifs'));


//db connection
connectDB();

//API endpoints

app.use('/api/user',userRouter)
app.use('/api/post',postRouter)




app.get('/',(req,res)=>{
    res.send("API working")
})

// Use the error-handling middleware (after routes)
app.use(errorMiddleware);

app.listen(PORT,()=>console.log(`Server is started on ${PORT}`))