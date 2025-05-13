import { Request,Response } from "express";
import Job from "../model/jobModel";
import { AuthRequest } from "../middleware/authMiddleware";


class JobController{
    
    async createJob(req:AuthRequest, res:Response):Promise<void>{
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

    async allJob(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id

        const data = await Job.find({}).populate('userId', 'name -_id')
        //console.log("data",data)
        if(data.length == 0){
            res.status(400).json({
                message : "No job found"
            })
            return 
        }
        res.status(200).json({
            message : "Job fetched successfully",
            data : data
        })
    }


    async editJob(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const jobId = req.params.id

      //  console.log("jobid",jobId)
        //console.log("Userid",userId)
        const{title, subject, location, NoS,time,SOffered,description, status} = req.body


        const findJob = await Job.findById(jobId)

        //console.log("findjob",findJob)
        if(!findJob ){
            res.status(404).json({
                message : "No job found with provided Id"
            })
            return 
        }


        const userJob = await Job.find({userId})
        //console.log("old user",userJob)
        if(userJob.length == 0){
            res.status(404).json({
                message : "No Job found for this user"
            })
            return
        }


       // console.log("userJob[0].id",userJob[0].id)

       // console.log("findJob.id",findJob.id)
        if(userJob[0].id !== findJob.id){
            res.status(403).json({
                message : "Unauthorized!! You can't update this job"
            })
            return
        }

        findJob.title = title || findJob.title
        findJob.location = location || findJob.location
        findJob.subject = subject || findJob.subject
        findJob.NoS = NoS || findJob.NoS
        findJob.time = time || findJob.time
        findJob.SOffered = SOffered || findJob.SOffered
        findJob.description = description || findJob.description
        findJob.status = status || findJob.status

        const updatedJob = await findJob.save()

        res.status(200).json({
            message : "Job updated successfully",
            data : updatedJob
        })


    }

    async getSingleJob(req:AuthRequest,res:Response):Promise<void>{
      //  const userId = req.user?.id
        const jobId = req.params.jobId 
        
        //console.log("jobid",jobId)
        if(!jobId){
            res.status(404).json({
                message : "Invalid JobId"
            })
            return
        }
        const jobFound = await Job.findById(jobId)
       // console.log("jobI",jobFound)

        if(!jobFound){
            res.status(404).json({
                message : "No job found"
            })
            return
        }
        res.status(200).json({
            message : "Job fetched successfully",
            data: jobFound
            
        })

    }

    async allYourJob(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        if(!userId){
            res.status(400).json({
                message :"No userId found"
            })
            return
        }

        const foundJob = await Job.find({userId})
        //console.log("jobFound",foundJob)
        if(foundJob.length == 0){
            res.status(404).json({
                message : "No job found"
            })
            return
        }
        res.status(200).json({
            message : "Jobfetched successfully",
            data : foundJob
        })


    }

    async deleteJob(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const jobId = req.params.jobId

        if(!jobId || !userId){
            res.status(400).json({
                message : "please provide jobId and userId"
            })
            return 
        }
        

        const foundJob = await Job.findById(jobId)
        //console.log("job id ko job",foundJob)

       //console.log("ok?.userId !== userId",foundJob?.userId?.toString() !== userId)
        // console.log("ok?.userI",foundJob?.userId?.toString())
        // console.log("userId",userId)


        if(foundJob?.userId?.toString() !== userId){
            res.status(400).json({
                message : "You can't delete this job" 
            })
            return
        }

        await Job.findByIdAndDelete(jobId)
        res.status(200).json({
            message : "Job deleted Successfully"
        })
    }



}
export default new JobController