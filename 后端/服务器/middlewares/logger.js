module.exports = () => {
  return (req, res, next) => {
    next();
    console.log(
      `${new Date().toLocaleString()} [${req.method
        .toString()
        .toUpperCase()}] -- ${req.originalUrl} `
    );
  };
};
