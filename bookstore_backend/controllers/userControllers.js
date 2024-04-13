import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import ReviewModel from '../models/Review.js';
import BookModel from '../models/Book.js';
import OrderModel from '../models/Order.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    res.send({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const emailCheck = await UserModel.findOne({ email: req.body.email });
    if (emailCheck) {
      res.status(400).send({
        success: false,
        message: {
          errors: [{ path: 'email', msg: 'Email address already in use.' }],
        },
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET
      );
      res.header('token', token).send({ success: true, data: user });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).select({
      'image.fileName': 0,
      'image.data': 0,
    });
    if (user) {
      const password = await bcrypt.compare(req.body.password, user.password);

      if (password) {
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '30d' }
        );

        res.header('token', token).send({ success: true, data: user });
      } else {
        res.send({
          success: false,
          message: 'Please make sure your password is correct',
        });
      }
    } else {
      res.send({
        success: false,
        message: 'Please make sure your email is correct',
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.files?.image?.name) {
      const fileName = Date.now() + '_' + req.files.image.name;
      const data = {
        fileName: fileName,
        data: req.files.image.data,
        thumbnail: `${process.env.PROFILE_IMAGE}${fileName}`,
      };
      const x = await UserModel.findByIdAndUpdate(
        req.params.id,
        { image: data },
        { new: true }
      );
      res.send({ success: true, data: x });
    }

    if (req.body?.lastName) {
      const x = await UserModel.findByIdAndUpdate(
        req.params.id,
        { lastName: req.body.lastName },
        { new: true }
      );
      res.send({ success: true, data: x });
    }

    if (req.body?.email) {
      const x = await UserModel.findByIdAndUpdate(
        req.params.id,
        { email: req.body.email },
        { new: true }
      );
      res.send({ success: true, data: x });
    }

    if (req.body?.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        { new: true }
      ).select({ 'image.fileName': 0, 'image.data': 0 });

      res.send({ success: true, data: user });
    }

    if (req.body?.address) {
      const x = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.send({ success: true, data: x });
    }
  } catch (error) {
    next(error);
  }
};

export const authorizedUser = (req, res) => {
  res.send({ success: true, data: req.user });
};

export const deleteUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userReviews = await ReviewModel.find({ userId: userId });
    const deletedReviews = await ReviewModel.deleteMany({ userId: userId });

    // delete the references in the User & Book collections:
    if (userReviews) {
      for (let i = 0; i < userReviews.length; i++) {
        // update the average rating of the book
        const findReviews = await ReviewModel.find({
          book: userReviews[i].book,
        });
        let sumRatings = 0;
        const sumRatingsArray = findReviews.map(
          (i) => (sumRatings += i.rating)
        );
        const average = sumRatingsArray.at(-1)
          ? (sumRatingsArray.at(-1) / findReviews.length)
              .toFixed(1)
              .replace(/\.0+$/, '')
          : 0;

        const findBook = await BookModel.findByIdAndUpdate(
          userReviews[i].book,
          { avgRating: average, $pull: { reviews: userReviews[i]._id } },
          { new: true }
        );
      }
    }

    const deletedOrders = await OrderModel.deleteMany({ userId: userId });
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .send({ success: false, message: 'User not found' });
    }

    res
      .status(200)
      .send({ success: true, message: 'Account deleted successfully!' });
  } catch (error) {
    next(error);
  }
};
