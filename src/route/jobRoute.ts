import express,{Router} from 'express'
import JobController from '../controller/jobController'
import isAuthenticated from '../middleware/authMiddleware'
import authMiddleware from '../middleware/authMiddleware'

const router:Router = express.Router()

router.route("/create")
    .post(authMiddleware.isAuthenticated,JobController.createJob)

export default router