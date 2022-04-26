
import * as bcryptUtils from "bcrypt";

export class Password {


    static async hashPassword (password: string){
     
     const hashedPassword = await bcryptUtils.hash(password,1);
      return hashedPassword;
    }


    static comparePassword(storedPassword: string, suppliedPassword: string){


    }
}