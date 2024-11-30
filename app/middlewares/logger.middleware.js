const sanitizeHtml = require("sanitize-html");

const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const sanitizeRequest = (req, res, next) => {
  if (req.body) {
    req.body = JSON.parse(
      JSON.stringify(req.body, (key, value) =>
        typeof value === "string" ? sanitizeHtml(value) : value
      )
    );
  }
  if (req.query) {
    req.query = JSON.parse(
      JSON.stringify(req.query, (key, value) =>
        typeof value === "string" ? sanitizeHtml(value) : value
      )
    );
  }
  next();
};

module.exports = { requestLogger, sanitizeRequest };
