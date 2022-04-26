import { Request, Response, NextFunction } from "express";
import { ErrorDetail, IError } from "../Interfaces/IError";
import { PayloadError, DatabaseError, CustomError } from "../models/errors";


export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction)=>{

   console.log(`ERROR!!!--- ${err}`);

   //check type of error

   if(err instanceof CustomError){
     
     
     return res.status(err.status).json(err.getErrors());

      
   }

     
  


   //uniform error structure so that react app can parse all types of errors-
   const formattedError =   { message : "Something went wrong"};
   const reportError : IError<ErrorDetail> = {
   
    errors : [formattedError]
  }
   res.send(reportError);

}