import mongoose, { Schema, Document, Model, Mongoose } from 'mongoose';
import { IReview, selectRating } from '../types/userTypes';
import Job from './jobModel';
import User from './userModel';


const reviewSchema: Schema<IReview> = new Schema(
  {

    description: {
        type : String,
        required : true
    },
    jobId : {
        type: mongoose.Types.ObjectId,
        ref : Job
    },
    userId : {
        type: mongoose.Types.ObjectId,
        ref : User
    },
    rating: {
        type: String,
        enum : selectRating,
        required : true
    },
    reviewCreator : {
        type: mongoose.Types.ObjectId,
        ref : User
    }


  },
  {
    timestamps: true,
  }
);


const Review: Model<IReview> = mongoose.model<IReview>('Review', reviewSchema);
export default Review;
