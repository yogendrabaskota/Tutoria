import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from 'bcrypt'


class UserController{
    async registerUser(req:Request,res:Response):Promise<void>{
        
        const {username, email, password, role} = req.body
        if(!username || !email || !password){
            res.status(400).json({
                message: "Please Provide username, email and password"
            })
            return
        }
        await User.create({
            name: username,
            email,
            password: bcrypt.hashSync(password,8),
            role
        })
        res.status(200).json({
            message : "User registered successfully"
        })
    }



}