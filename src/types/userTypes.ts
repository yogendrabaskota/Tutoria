import { ObjectId } from "mongoose";

export interface IUser extends Document {
  email: string,
  name: string,
  role : Userrole,
  password: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export enum Userrole {
    Teacher = 'Teacher',
    User = 'User'
}

export interface IJob {
  title: string,
  subject: string,
  location: String,
  NoS: String, //Number of students
  time: String,
  SOffered: string, //salary offered
  description: Text,
  status: setStatus,
  userId: string | null

}

export enum setStatus {
  open = 'open',
  closed = 'closed',
  hired = 'hired'
}

export interface IApplication {
  address : string,
  qualification : string,
  experience : string,
  rSalary : string,
  contact: string
  userId: string | null,
  jobId : string | null
  status : aStatus

}

export enum aStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected'
}

export interface IReview {
  description : string,
  rating : selectRating,
  jobId : string | null,
  userId : string | null,
  reviewCreator : string | null
}

export enum selectRating {
  excellent = 'excellent',
  good = 'good',
  average = 'average',
  bad = 'bad',
  worst = 'worst'
}