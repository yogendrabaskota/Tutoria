import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser, Userrole } from '../types/userTypes';


const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type : String,
        enum : Userrole,
        default: Userrole.User
    }
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
