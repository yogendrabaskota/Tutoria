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