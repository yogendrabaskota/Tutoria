import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest, Role } from "../middleware/authMiddleware";
import { Userrole } from "../types/userTypes";

class UserController {
  async registerUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400).json({
        message: "Please Provide username, email and password and role",
      });
      return;
    }

    const emailFOund = await User.find({ email });
    //console.log("emailfound",emailFOund)
    if (emailFOund.length > 0) {
      res.status(400).json({
        message: "This email is already used. Please used unique email address",
      });
      return;
    }

    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      role,
    });
    res.status(200).json({
      message: "User registered successfully",
    });
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email and password",
      });
      return;
    }
    const userFound = await User.find({ email });
    //console.log(userFound);
    if (userFound.length === 0) {
      res.status(400).json({
        message: "No user registered with this email",
      });
      return;
    }
    const isMatched = bcrypt.compareSync(password, userFound[0].password);

    if (isMatched) {
      const token = jwt.sign(
        { id: userFound[0]._id },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "30d",
        }
      );

      res.status(200).json({
        message: "User loggedIn successfully",
        token: token,
        role: userFound[0].role,
        user: {
          id: userFound[0]._id,
          name: userFound[0].name,
          email: userFound[0].email,
          role: userFound[0].role,
        },
      });
    } else {
      res.status(403).json({
        message: "Invalid password",
      });
    }
  }

  async getMyProfile(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    // console.log("userif",userId)

    if (!userId) {
      res.status(400).json({
        message: "please provide userid",
      });
      return;
    }

    const foundProfile = await User.findById(userId);
    // console.log("user found",foundProfile)

    res.status(200).json({
      message: "Profile fetched successfully",
      data: foundProfile,
    });
  }

  async deleteMyProfile(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({
        message: "Cannot find userId",
      });
      return;
    }

    //const userFound = await User.findById(userId)
    //console.log("user found",userFound)

    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User Deleted successfully",
    });
  }

  async allUser(req: AuthRequest, res: Response): Promise<void> {
    const allUser = await User.find();
    // console.log(allUser)
    if (allUser.length == 0) {
      res.status(404).json({
        message: "No user found",
      });
      return;
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: allUser,
    });
  }

  async allTeacher(req: AuthRequest, res: Response): Promise<void> {
    const userFound = await User.find({ role: Userrole.Teacher });
    // console.log(userFound)

    if (userFound.length == 0) {
      res.status(404).json({
        message: "No Teacher found",
      });
      return;
    }

    res.status(200).json({
      message: "Teacher fetched successfully",
      data: userFound,
    });
  }

  async editUser(req: AuthRequest, res: Response): Promise<void> {
    const { userId } = req.params;
    const { name, email } = req.body;

    if (!req.user?.id || req.user.id !== userId) {
      res.status(403).json({
        message: "Unauthorized",
      });
      return;
    }

    try {
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      if (email && email !== currentUser.email) {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          res.status(400).json({
            message: "This email is already in use by another user.",
          });
          return;
        }
      }

      currentUser.name = name || currentUser.name;
      currentUser.email = email || currentUser.email;
      await currentUser.save();

      res.status(200).json({
        message: "User updated successfully",
        data: currentUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new UserController();
