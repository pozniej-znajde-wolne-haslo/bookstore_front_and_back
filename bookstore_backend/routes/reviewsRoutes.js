import { Router } from 'express';
import {
  addReview,
  deleteReview,
  editReview,
  getAllReviews,
  getReviewsByBookId,
  getReviewsByUserId,
} from '../controllers/reviewsControllers.js';
import { authorization } from '../middleware/authorization.js';

const routes = Router();

routes.get('/all', getAllReviews);
routes.get('/one_user', authorization, getReviewsByUserId);
routes.get('/one_book/:id', getReviewsByBookId);
routes.post('/new', authorization, addReview);
routes.patch('/edit/:id', authorization, editReview);
routes.delete('/delete/:id', authorization, deleteReview);

export default routes;
