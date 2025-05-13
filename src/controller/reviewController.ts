import { Request,Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Review from "../model/reviewModel";


class ReviewController{
    
    async createReview(req:AuthRequest, res:Response):Promise<void>{
        const userId = req.params.userId
        const jobId = req.params.jobId 
        const reviewCreator = req.user?.id


        console.log("userId",userId)
        console.log("jobId",jobId)
        console.log("reviewCreator",reviewCreator)
        const {description, rating} = req.body
    
        if(!userId || !jobId || !reviewCreator){
            res.status(400).json({
                message : "Please provide userId,reviewCreator and jobId"
            })
            return
        }
        if(!description || !rating){
            res.status(400).json({
                message :"Please provide description and rating"
            })
            return
        }


        const findJob = await Review.find({userId,jobId})
        console.log("findJob",findJob)

        if(findJob.length == 0){
            res.status(404).json({
                message : "No job found for selected teacher"
            })
            return
        }

        const newReview = await Review.create({
            userId,
            jobId,
            description,
            rating,
            reviewCreator
        })
        res.status(200).json({
            message : "Review given successfully",
            data : newReview
        })

    }


    async getJobReview(req:AuthRequest,res:Response):Promise<void>{
        const jobId = req.params.jobId 

        console.log("jobid",jobId)
        if(!jobId){
            res.status(400).json({
                message : "No jobId found"
            })
            return
        }

        const jobReview = await Review.find({jobId})
        console.log("JOb revirew",jobReview)

        if(jobReview.length == 0){
            res.status(404).json({
                message : "No review found for this job"
            })
            return
        }
        res.status(200).json({
            message : "Review siccessfully fetched for selected job",
            data : jobReview
        })
    }

     async getTeacherrReview(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.params.userId  

        console.log("userId",userId)
        if(!userId){
            res.status(400).json({
                message : "No userId found"
            })
            return
        }

        const userReview = await Review.find({userId})
        console.log("userReview ",userReview)

        if(userReview.length == 0){
            res.status(404).json({
                message : "No review found for this job"
            })
            return
        }
        res.status(200).json({
            message : "Review siccessfully fetched for selected user",
            data : userReview
        })
    }

    async getUserReview(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.params.userId 
        if(!userId){
            res.status(400).json({
                message : "UserId not found"

            })
            return
        }

        const clientReview = await Review.find({reviewCreator : userId})
        console.log("client review",clientReview)
        if(clientReview.length == 0){
            res.status(404).json({
                message : "No review given"
            })
            return
        }
        
        res.status(200).json({
            message : "Review fetched successfully",
            data : clientReview
        })

    }



}
export default new ReviewController