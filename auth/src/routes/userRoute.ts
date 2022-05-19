import express from  "express";
import { PayloadError, DatabaseError } from "../models/errors";
import { Request,Response,  NextFunction } from "express";
import User from "../models/user";
import { UserDocument } from "../Interfaces/IUserDocument";
import jwt from "jsonwebtoken";
import { validateInputs } from "../middlewares/validateInputs";
import { Password } from "../middlewares/PasswordActions";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";
const router = express.Router();


router.get("/", (req: Request,res: Response, next: NextFunction)=>{

    res.send("Hello from Auth User routes!");
})

router.get("/currentUser", currentUser, requireAuth,(req: Request,res: Response, next: NextFunction)=>{
    
  res.send({currentUser : req.currentUser})
 
})

router.post("/signup", validateInputs, async (req: Request,res: Response, next: NextFunction)=>{

    const {email, password} = req.body;
    console.log("signup route")
    const existingEmail = await User.findOne({email})
    
    if(existingEmail){
       return next(new PayloadError(["Email already in use"])); //Stephen grider creates a new error class --bad request error--skipping that for now
       

    }else{

        //create a new user
        
        const user =  User.buildUser({email,password});
        await user.save();  //this triggeres the pre save hook on mongoose--refer user.ts under models and lok at userSchema.pre("save") method
        
        //form the jwt

       const userToken = jwt.sign({
        id: user.id,
        email : user.email

        }, process.env.JWT_KEY!) //THE ! after says that we know for sure the jwt key exists

        req.session = {
            jwt : userToken
        }
        

        res.send(user);

    }
    

    //res.send("hey from signup route")

    
})

router.post("/signout", (req: Request,res: Response, next: NextFunction)=>{

    //remove cookie data from session

    // if(req.session?.jwt){
    //     req.session.jwt = undefined;
    // }
    req.session =undefined;

    res.send({});
})

router.post("/signin", validateInputs, async (req: Request,res: Response, next: NextFunction)=>{

    //get email and password from body
    const {email, password} = req.body;
  
    //check if user exists
    const existingUser = await User.findOne({email});

    //throw error if user not present
    if(!existingUser){
       return next(new PayloadError(["Email or Password is incorrect"]))
    }

    //compare password

    const isPasswordCorrect = await Password.comparePassword( existingUser.password , password);

    if(isPasswordCorrect === false){

        return next(new PayloadError(["Email or Password is incorrect"]))
    }


    
    //form the jwt

    const userToken =  jwt.sign({
    id: existingUser.id,
    email : existingUser.email

    }, process.env.JWT_KEY!) //THE ! after says that we know for sure the jwt key exists

    req.session = {
        jwt : userToken
    }
    

    res.status(200).send(existingUser);

})

export default router;