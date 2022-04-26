
export type ErrorDetail = {
    
        message : string,
        field? : string
    

}
export interface IError<ErrorDetail>{

    errors : ErrorDetail[]
}