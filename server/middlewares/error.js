module.exports = () => {
  return (req, res, next) => {
    try {
      next();
    } catch (err) {
      console.error(err);
      res.json(500).body = {
        err: err.toString(),
        message: 'internal server error',
      };
    }
  };
};
