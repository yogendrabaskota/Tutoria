import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";


class UserController{
    public static async registerUser(req:Request,res:Response):Promise<void>{
        
        const {username, email, password, role} = req.body
        if(!username || !email || !password){
            res.status(400).json({
                message: "Please Provide username, email and password"
            })
            return
        }

        const emailFOund = await User.find(email)
        if(emailFOund){
            res.status(400).json({
                message : "This email is already used. Please used unique email address"
            })
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

    public static async loginUser(req:Request, res:Response):Promise<void>{
        const{email, password} = req.body

        if(!email || !password){
            res.status(400).json({
                message : "Please provide email and password"
            })
            return 
        }
        const userFound = await User.find(email)
        if(userFound.length === 0){
            res.status(400).json({
                message: "No user registered with this email" 
            })
            return
        }
        const isMatched = bcrypt.compareSync(password,userFound[0].password)

        if(isMatched){
            const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
                expiresIn : '30d'
            })

            res.status(200).json({
                message : "User loggedIn successfully",
                token : token
            })
        }else{
            res.status(400).json({
                message : "Invalid password"
            })
        }

    }

}

export default UserController