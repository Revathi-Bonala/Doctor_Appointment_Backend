import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
 import authRoute from './routes/auth.js';
 import userRoute from './routes/user.js'
 import doctorRoute from './routes/doctor.js'
 import reviewRoute from './routes/review.js'
 import bookingRoute from './routes/booking.js'


//dotenv.config is used to load environment variables from the .env file   
dotenv.config()
const app=express()
const port=process.env.port || 8000

const corsOptions={
     //origin-true allows in domain access   the server 
     origin:true 
}
app.get('/',(req,res)=>{
    res.send('Api is working')
})
//database connection
mongoose.set('strictQuery',false);
const connectDb =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
           useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("mongodb db is connected")
    } catch(err){
        console.log("mongodb db is not  connected")

    }
}
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/reviews',reviewRoute);
app.use('/api/v1/bookings',bookingRoute);


app.listen(port,()=>{
    connectDb();
    console.log("server is running on port",port);
})
