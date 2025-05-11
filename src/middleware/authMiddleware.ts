import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../model/userModel";

export interface AuthRequest extends Request {
  user?: {
    name: string;
    email: string;
    role: string;
    password: string;
    id: string;
  };
}
export enum Role {
    Teacher = 'Teacher',
    User = 'User'
}

class AuthMiddleware {
  async isAuthenticated(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization;
    if (!token) {
      res.status(403).json({
        message: "Please Login",
      });
      return;
    }

    jwt.verify(token, process.env.SECRET_KEY as string, async (err, decoded: any) => {
      if (err) {
        res.status(403).json({
          message: "Invalid Token",
        });
      } else {
        try {
          const userData = await User.findById(decoded.id).select('-password'); // Exclude password if needed

          if (!userData) {
            res.status(404).json({
              message: "No user with that token",
            });
            return;
          }

          req.user = {
            name: userData.name,
            email: userData.email,
            role: userData.role,
            password: userData.password,
            id: userData._id.toString(),
          };

          next();
        } catch (error) {
          res.status(500).json({
            message: "Something went wrong",
          });
        }
      }
    });
  }

  restrictTo(...roles: Role[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      const userRole = req?.user?.role as Role;

      if (!roles.includes(userRole)) {
        res.status(403).json({
          message: "You don't have permission",
        });
      } else {
        next();
      }
    };
  }
}

export default new AuthMiddleware();
