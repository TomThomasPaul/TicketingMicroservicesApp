import mongoose from "mongoose";
import { UserDocument, UserModel, UserAttributes } from "../Interfaces/IUserDocument";
import { Password } from "../middlewares/PasswordActions";

const userSchema = new mongoose.Schema({ //create a schema for User Model

    email : {
        type : String,
        required: true
    },
    password: {

        type: String,
        required: true,
        //select : false //dont show password when fetching results
    },
  
},   {
    toJSON : {
        transform(doc, returnedDoc){

            returnedDoc.id = returnedDoc._id;
            delete returnedDoc._id;
            delete returnedDoc.__v;
            delete returnedDoc.password;
        }
    }
})

userSchema.pre('save', async function(done){

    if(this.isModified('password')){  //turns true when a ne wpassword is created or if password is changed on the schema

        const hashedPassword = await Password.hashPassword(this.get("password")); // this.get ('password') will get the password from the user document.
        console.log(hashedPassword);
        this.set('password', hashedPassword);
        console.log(this.password)
        done();
    }
})
userSchema.statics.buildUser = (user: UserAttributes)=>{ //the function builduser is declared

    return new User(user);
   
 
 
 }
const User = mongoose.model<UserDocument, UserModel>('User',userSchema);




export default  User;