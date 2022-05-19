import request from "supertest"
import app from "../../app"
import { signup } from "./authHelper"

it("Return current user details after signup and current user route", async()=>{

   // const cookie = await signup();

    const cookie  =  await signup();

    const response = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie',cookie)
        .send()
        .expect(200)
     
        expect(response.body.currentUser.email).toEqual("abc@gmail.com")

})


it("Return undefined for current user if not authenticate", async()=>{

    
 
     const response = await request(app)
         .get('/api/users/currentUser')
         .send()
         .expect(200)

         expect(response.body.currentUser).toBeUndefined();
         
 
 })


