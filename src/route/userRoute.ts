import express,{Router} from 'express'
import UserController from '../controller/userController'
import authMiddleware from '../middleware/authMiddleware'
import userController from '../controller/userController'

const router:Router = express.Router()

router.route("/register")
    .post(UserController.registerUser)
router.route("/login")
    .post(UserController.loginUser)
router.route("/myprofile")
    .get(authMiddleware.isAuthenticated, UserController.getMyProfile)
    .delete(authMiddleware.isAuthenticated,UserController.deleteMyProfile)


router.route("/all")
    .get(authMiddleware.isAuthenticated,UserController.allUser)
router.route("/teacher")
    .get(authMiddleware.isAuthenticated,UserController.allTeacher)


router.route("/myprofile/:userId")
    .patch(authMiddleware.isAuthenticated,userController.editUser)


export default router