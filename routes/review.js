import express from 'express'
import { getAllReviews,createReview } from '../controllers/reviewController.js'
import { authenticate,restrict } from '../auth/verifiedToken.js'

const router = express.Router({mergeParams:true}) //for accesssing doctor id we use merge params

// /doctor/doctorId/reviews for particular doctor the way user route for that we will use nested route go to routes/doctor.js
router
.route('/')
.get(getAllReviews)
.post(authenticate,restrict(["patient"]),createReview)
export default router;