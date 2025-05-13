import express,{Router} from 'express'
import authMiddleware, { Role } from '../middleware/authMiddleware'
import reviewController from '../controller/reviewController'

const router:Router = express.Router()


router.route('/create/:userId/:jobId')
    .post(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.User), reviewController.createReview)

router.route('/jobreview/:jobId')
    .get(authMiddleware.isAuthenticated,reviewController.getJobReview)

router.route('/teacherreview/:userId')
    .get(authMiddleware.isAuthenticated,reviewController.getTeacherrReview)

router.route('/userreview/:userId')
    .get(authMiddleware.isAuthenticated,reviewController.getUserReview)

export default router