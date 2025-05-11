import { Request,Response } from "express";


class JobController{
    async createJob(req:Request, res:Response){
        const { title, subject, location, NoS,time,SOffered,description, status} = req.body

        if(!title || !subject || !location || !NoS || !time || !SOffered || !description || !status){
            res.status(400).json({
                message : "Please provide title, subject, location, NoS,time,SOffered,description and status"

            })
            return
        }
     
        res.status(200).json({
            message : "Job Created Successfully"
        })
    }
}
export default new JobController