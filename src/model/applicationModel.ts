import mongoose, { Schema, Document, Model, Mongoose } from 'mongoose';
import { aStatus, IApplication,} from '../types/userTypes';
import User from './userModel';
import Job from './jobModel';


const applicationSchema: Schema<IApplication> = new Schema(
  {

    userId: {
        type: mongoose.Types.ObjectId,
        ref : User
    },
    jobId : {
        type: mongoose.Types.ObjectId,
        ref : Job
    },

    address: {
        type: String
    },
    qualification : {
        type : String,
        required: true 
    },
    experience : {
        type : String
    },
    rSalary : {
        type : String,
        required : true
    },
    contact: {
        type : String,
        required : true
    },
    status: {
        type: String,
        enum : aStatus,
        default: aStatus.pending
    },


  },
  {
    timestamps: true,
  }
);


const Application: Model<IApplication> = mongoose.model<IApplication>('Application', applicationSchema);
export default Application;
