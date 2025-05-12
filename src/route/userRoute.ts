import express,{Router} from 'express'
import UserController from '../controller/userController'
import authMiddleware from '../middleware/authMiddleware'

const router:Router = express.Router()

router.route("/register")
    .post(UserController.registerUser)
router.route("/login")
    .post(UserController.loginUser)
router.route("/myprofile")
    .get(authMiddleware.isAuthenticated, UserController.getMyProfile)

export default router