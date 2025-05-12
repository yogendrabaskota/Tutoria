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

router.route("/single/:jobId")
    .get(authMiddleware.isAuthenticated,JobController.getSingleJob)
    .delete(authMiddleware.isAuthenticated,JobController.deleteJob)

router.route("/your")
    .get(authMiddleware.isAuthenticated,jobController.allYourJob)


export default router