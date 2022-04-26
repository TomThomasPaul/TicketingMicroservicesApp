import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document{
    email: string,
    password: string
 }

 export interface UserModel extends mongoose.Model<UserDocument>{
    buildUser(user : UserAttributes) :UserDocument;
}


export interface UserAttributes{
    email: string,
    password: string

}