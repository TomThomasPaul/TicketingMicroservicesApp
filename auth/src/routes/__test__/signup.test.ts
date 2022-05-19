import request from "supertest"
import app from "../../app"


//signup tests
it("Returns status 201 on user signup or 400 if user exists", async()=>{

     await request(app)
     .post('/api/users/signup')
     .send({
         email :"abc@gmail.com",
         password: "pwd@123"
     })
     .expect(201)

     await request(app)
         .post('/api/users/signup')
         .send({
             email :"abc@gmail.com",
             password: "pwd@123"
         })
         .expect(400)  //user already exists

})


it("Returns status 400 on invalid email and password for signup", async()=>{
    
    await request(app)
    .post('/api/users/signup')
    .send({
        email :"", //passing empty email 
        password: "pwd@123"
    })
    .expect(400)

    await request(app)
    .post('/api/users/signup')
    .send({
        email :"abc@gmail.com", //passing empty password 
        password: ""
    })
    .expect(400)

})



it("Expects a cookie to be set after signup", async()=>{

    const response = await request(app)
    .post('/api/users/signup') //this is an http request and not https
    .send({
        email :"abc@gmail.com",
        password: "pwd@123"
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();

})






