import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import { AuthRequest } from "../middleware/authMiddleware";


class UserController{
    async registerUser(req:Request,res:Response):Promise<void>{
        
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

    async loginUser(req:Request, res:Response):Promise<void>{
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

    async getMyProfile(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id
       // console.log("userif",userId)

        if(!userId){
            res.status(400).json({
                message :"please provide userid"
            })
        }

        const foundProfile = await User.findById(userId)
       // console.log("user found",foundProfile)

    
        res.status(200).json({
            message : "Profile fetched successfully",
            data : foundProfile
        })
    }


}

export default new UserController