module.exports = function (req, res, next) {
    const authHeaderValue = req.headers.authorization;
        if (!authHeaderValue || authHeaderValue !== 'mysecrettoken') {
            const err = new Error("Forbidden");
            err.status = 403;
            return next(err); // This will be caught by error handler
        } else {
            return next(); // No error proceed to next middleware
        };
  };