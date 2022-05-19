
import * as bcryptUtils from "bcrypt";

export class Password {


    static async hashPassword (password: string){
     
     const hashedPassword = await bcryptUtils.hash(password,1);
      return hashedPassword;
    }


    static async comparePassword(storedPassword: string, suppliedPassword: string){
     console.log(storedPassword,suppliedPassword)    
    // const hashedInputPwd = await this.hashPassword(suppliedPassword); 
    // console.log(storedPassword,hashedInputPwd) ;  
     return await bcryptUtils.compare(suppliedPassword,storedPassword);

    }
}