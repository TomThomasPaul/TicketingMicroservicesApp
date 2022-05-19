import request from "supertest"
import app from "../../app"

it("successful signin after a signup", async()=>{

    
    await request(app)
    .post('/api/users/signup')
    .send({
        email :"abc@gmail.com",
        password: "pwd@123"
    })
    .expect(201)

   const response = await request(app)
    .post('/api/users/signin')
    .send({
        email :"abc@gmail.com",
        password: "pwd@123"
    })
    .expect(200)

    expect(response.get("Set-Cookie")).toBeDefined();


})

it("400 status when wrong email or wrong password is supplied", async()=>{

    
    await request(app)
    .post('/api/users/signup')
    .send({
        email :"abc@gmail.com",
        password: "pwd@123"
    })
    .expect(201)

    await request(app)
    .post('/api/users/signin')
    .send({
        email :"abccc@gmail.com",
        password: "pwd@123"
    })
    .expect(400)

    await request(app)
    .post('/api/users/signin')
    .send({
        email :"abccc@gmail.com",
        password: "pwddd@123"
    })
    .expect(400)




})


