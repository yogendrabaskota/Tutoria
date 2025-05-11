import express,{Router} from 'express'
import JobController from '../controller/jobController'
import  { Role } from '../middleware/authMiddleware'
import authMiddleware from '../middleware/authMiddleware'
import jobController from '../controller/jobController'

const router:Router = express.Router()


router.route('/edit/:id')
    .patch(authMiddleware.isAuthenticated,JobController.editJob)

router.route("/create")
    .post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.User), JobController.createJob)

router.route("/all")
    .get(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.User),jobController.allJob)





export default router