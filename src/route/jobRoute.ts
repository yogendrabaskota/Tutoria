import express,{Router} from 'express'
import JobController from '../controller/jobController'

const router:Router = express.Router()

router.route("/create")
    .post(JobController.createJob)

export default router