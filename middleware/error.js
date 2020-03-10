const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  // Log to console for dev
  console.log(err.stack.red);

  console.log('ERROR', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Bootcamp not found with ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
