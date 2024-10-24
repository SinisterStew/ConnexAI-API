var createError = require('http-errors');
var express = require('express');
const promMid = require('express-prometheus-middleware');
const cors = require('cors');

var timeRouter = require('./routes/time');
var restrictMiddleware = require("./authorization/restrict");

var app = express();

const options = {
  origin: 'http://localhost:3001',
}

app.use(cors(options))

// Apply authorization middleware before any other 
app.use(restrictMiddleware)

app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
}));


app.use('/time', timeRouter);

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.send({message: err.message})
});

module.exports = app;
