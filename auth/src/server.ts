import app from "./app";
import mongoose from "mongoose";

const connectToDb = async ()=>{
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log("Connected to mongodb on Kubernetes pod via ClusterIP service")
        app.listen(3000, ()=>{

            console.log("app is listening at port 3000!")
        })
       

    }catch(err){
   console.error(err)

    }
    
};


connectToDb();

