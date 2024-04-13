export const notFound = (req, res) => {
  res.status(404).send({ success: false, message: 'Page Not Found' });
};

export const errorStatus = (err, req, res, next) => {
  res.status(err.status).send({ success: false, message: err.message });
};
