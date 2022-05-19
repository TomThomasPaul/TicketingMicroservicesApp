import request from "supertest"
import app from "../../app"

export const signup = async ()=>{

   const response  =  await request(app)
   .post('/api/users/signup')
   .send({
       email :"abc@gmail.com",
       password: "pwd@123"
   })
    

   const cookie = response.get("Set-Cookie");
   console.log(response.body)
   return cookie;
   
    
}