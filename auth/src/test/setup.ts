import {MongoMemoryServer} from "mongodb-memory-server";
import app from "../app";
import mongoose from "mongoose";


let mongo : MongoMemoryServer;
//before all tests execution
beforeAll(async()=>{

    //assign environment variables for the test env
    process.env.JWT_KEY = "TomsSecret";

    //connet to the mongo memory server
    //  mongo = new MongoMemoryServer();
    //  const mongoUri = await mongo.getUri();  This way no longer works , check the below code

     mongo = await MongoMemoryServer.create();
     const mongoUri = mongo.getUri();

     await mongoose.connect(mongoUri);
    

})

//before each test
beforeEach(async ()=>{

    //delete all documents from collections
    let collections = await mongoose.connection.db.collections();
    for(let collection of collections){

       await collection.deleteMany({})
    }


})

//after all tests
afterAll(async()=>{

    //close mongo memory server
    await mongo.stop();

    //close connection
    await mongoose.connection.close();

})