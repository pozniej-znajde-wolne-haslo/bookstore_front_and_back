import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const authorization = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload) {
      const user = await UserModel.findById(payload._id).select({
        'image.fileName': 0,
        'image.data': 0,
      });
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};
