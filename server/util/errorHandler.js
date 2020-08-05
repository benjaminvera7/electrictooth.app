function errorHandler (err, req, res) {
  const errorText = err.toString();

  res.status(500).json({
    error: errorText,
  });
};

module.exports = errorHandler;
