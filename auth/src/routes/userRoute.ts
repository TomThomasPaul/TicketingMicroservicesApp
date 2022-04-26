import express from  "express";
import { PayloadError, DatabaseError } from "../models/errors";
import { Request,Response,  NextFunction } from "express";
import User from "../models/user";
import { UserDocument } from "../Interfaces/IUserDocument";
const router = express.Router();


router.get("/", (req: Request,res: Response, next: NextFunction)=>{

    res.send("Hello from Auth User routes!");
})

router.get("/currentUser", (req: Request,res: Response, next: NextFunction)=>{

    res.send("This is current user route");
})

router.post("/signup", async (req: Request,res: Response, next: NextFunction)=>{

    const {email, password} = req.body;

    if(!email || !password) {

        // res.status(400).json({
        //     status : "Error",
        //     message : "Email or Password is req: Requestuired"
        // })
        return next(new PayloadError(["Email or Password is required."])) ; //this will pass down the error to global error handler
        
        
    }
    const existingEmail = await User.findOne({email})
    
    if(existingEmail){
       return next(new PayloadError(["Email already in use"])); //Stephen grider creates a new error class --bad request error--skipping that for now
       

    }else{

        //create a new user
        
        const user =  User.buildUser({email,password});
        await user.save();  //this triggeres the pre save hook on mongoose--refer user.ts under moels and lok at userSchema.pre("save") method
        res.send(user);

    }
    

    //res.send("hey from signup route")

    
})

router.post("/signout", (req: Request,res: Response, next: NextFunction)=>{

    res.send("This is signout route");
})

router.post("/signin", (req: Request,res: Response, next: NextFunction)=>{

    res.send("This is signin route");
})

export default router;