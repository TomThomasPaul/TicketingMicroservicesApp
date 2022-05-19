import { Request , Response , NextFunction } from "express";
import { PayloadError } from "../models/errors";

export const validateInputs = (req : Request,res: Response, next : NextFunction) =>{

    const {email, password} = req.body;
    if(!email || !password) {

        return next(new PayloadError(["Email or Password is required."])) ; //this will pass down the error to global error handler
        
        
    }

    next();

}