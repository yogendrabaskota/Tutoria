import mongoose, { Schema, Document, Model, Mongoose } from 'mongoose';
import { IJob, setStatus } from '../types/userTypes';


const jobSchema: Schema<IJob> = new Schema(
  {
    title: {
        type: String
    },

    subject: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    time: {
        type: String,
        required: true
    },

    NoS: {
        type: String,
        required: true
    },
    SOffered: {
        type: Number,
        required : true
    },
    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum : setStatus,
        default: setStatus.open
    },

    userId: {
        type: mongoose.Types.ObjectId
    }

  },
  {
    timestamps: true,
  }
);


const Job: Model<IJob> = mongoose.model<IJob>('Job', jobSchema);
export default Job;
