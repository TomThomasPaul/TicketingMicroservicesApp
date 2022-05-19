import { Request, Response, NextFunction } from "express";
import { PayloadError } from "../models/errors";

export const requireAuth = (req: Request, res: Response, next: NextFunction)=>{

if(!req.currentUser){
   return next(new PayloadError(["Not Authorized, Please log in or sign up"]))

}


    next();

}