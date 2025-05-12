import express,{Router} from 'express'
import  { Role } from '../middleware/authMiddleware'
import authMiddleware from '../middleware/authMiddleware'

import applicationController from '../controller/applicationController'

const router:Router = express.Router()


router.route('/create/:jobId')
    .post(authMiddleware.isAuthenticated,applicationController.createApplication)

router.route("/getall/:jobId")
    .get(authMiddleware.isAuthenticated,applicationController.getAllApplication)

export default router