import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload{
    email :string,
    password: string
}

//add currentUser to express Request interface
declare global{
    namespace Express{

      interface Request{
          currentUser? : UserPayload
      }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction)=>{

    if(!req.session?.jwt){

        return next();

    }
       try{
        const userDetails : UserPayload =    jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = userDetails;
      

       }catch(err){

         
       }

       next();
      


    

}