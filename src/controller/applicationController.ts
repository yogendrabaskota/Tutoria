import { Request,Response } from "express";
import Job from "../model/jobModel";
import { AuthRequest } from "../middleware/authMiddleware";
import Application from "../model/applicationModel";


class ApplicationController{

    async createApplication(req:AuthRequest,res:Response){
        const {address,qualification,experience,rSalary,contact,status} = req.body
        const userId = req.user?.id
        const jobId = req.params.jobId
        
        if(!address || !qualification || !experience || !rSalary || !contact){
            res.status(400).json({
                message : "Please provide address,qualification,experience,rSalary,contact"

            })
            return 
        }
        if(!userId){
            res.status(400).json({
                message : "No userId found"
            })
            return
        }
        if(!jobId){
            res.status(400).json({
                message : "No jobId found"
            })
            return
        }

        const newApplication = await Application.create({
            address,
            qualification,
            experience,
            rSalary,
            contact,
            userId,
            jobId,
            status
        })
        res.status(200).json({
            message : "Application created successfully",
            data : newApplication

        })


    }

    // get application of specific job
    async getAllApplication(req:AuthRequest,res:Response):Promise<void>{
        const jobId = req.params.jobId

        if(!jobId){
            res.status(400).json({
                message : "Please provide jobId"
            })
            return
        }

        const jobFound = await Application.find({jobId}).populate('userId','name email -_id').populate('jobId','title -_id')
        //console.log("all application of that job",jobFound)

        if(jobFound.length == 0){
            res.status(404).json({
                message : "no Application found in this job"
            })
            return 
        }
        res.status(200).json({
            message : "Application fetched successfully",
            data : jobFound
        })
        
    }    



}
export default new ApplicationController