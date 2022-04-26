import { ErrorDetail, IError } from "../Interfaces/IError";

export abstract class CustomError extends Error{
  
  abstract status: number;

  constructor(){
    super();
    
  
  }


  abstract getErrors() : IError<ErrorDetail>

}


export class PayloadError extends CustomError{
  
  status = 400;
  constructor(public errorMessages: string[]){
    super();

    this.errorMessages = errorMessages;

  }

  getErrors(): IError<ErrorDetail> {
    
    const formattedErrors : ErrorDetail[] = this.errorMessages.map((message)=>{

      return {
        message
      }
    })

    return { errors : formattedErrors}
  }

}


export class DatabaseError extends CustomError{

     status = 500;
     constructor(public errorMessage: string){

        super();

        this.errorMessage = errorMessage;
     }

     getErrors(): IError<ErrorDetail> {
    
      const formattedErrors : ErrorDetail[] = [{message : this.errorMessage}]
  
      return { errors : formattedErrors}
    }
}
