import GenreModel from '../models/Genre.js';

export const genres = async (req, res, next) => {
  try {
    const genres = await GenreModel.find();
    res.send({ success: true, data: genres });
  } catch (error) {
    next(error);
  }
};
