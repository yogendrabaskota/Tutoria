import { Request,Response } from "express";
import Job from "../model/jobModel";
import { AuthRequest } from "../middleware/authMiddleware";


class JobController{
    
    async createJob(req:AuthRequest, res:Response){
        const userId = req.user?.id 
        const { title, subject, location, NoS,time,SOffered,description, status} = req.body

        if(!title || !subject || !location || !NoS || !time || !SOffered || !description || !status){
            res.status(400).json({
                message : "Please provide title, subject, location, NoS,time,SOffered,description and status"

            })
            return
        }

        await Job.create({
            title,
            subject,
            location,
            time,
            NoS,
            SOffered,
            status,
            description,
            userId
        })
     
        res.status(200).json({
            message : "Job Created Successfully"
        })
    }
}
export default new JobController