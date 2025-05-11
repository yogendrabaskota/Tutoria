import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";


class UserController{
    public static async registerUser(req:Request,res:Response):Promise<void>{
        
        const {name, email, password, role} = req.body
        if( !name || !email || !password || !role){
            res.status(400).json({
                message: "Please Provide username, email and password and role"
            })
            return
        }

        const emailFOund = await User.find({email})
        //console.log("emailfound",emailFOund)
        if(emailFOund.length > 0){
            res.status(400).json({
                message : "This email is already used. Please used unique email address"
            })
            return
        }

        await User.create({
            name,
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
        const userFound = await User.find({email})
        if(userFound.length === 0){
            res.status(400).json({
                message: "No user registered with this email" 
            })
            return
        }
        const isMatched = bcrypt.compareSync(password,userFound[0].password)

        if(isMatched){
            const token = jwt.sign({id : userFound[0]._id}, process.env.SECRET_KEY as string,{
                expiresIn : '30d'
            })

            res.status(200).json({
                message : "User loggedIn successfully",
                token : token
            })
        }else{
            res.status(403).json({
                message : "Invalid password"
            })
        }

    }

}

export default UserController