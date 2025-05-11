export interface IUser extends Document {
  email: string,
  name: String,
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
  SOffered: number, //salary offered
  description: Text,
  status: setStatus

}

export enum setStatus {
  open = 'open',
  closed = 'closed',
  hired = 'hired'
}