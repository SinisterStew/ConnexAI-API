var express = require('express');
var router = express.Router();

/* GET current server time, in epoch seconds, at time of processing the request. */
router.get('/', function(req, res, next) {
  
  res.setHeader('Content-Type', 'application/json'); 
  const now = Date.now(); // Unix timestamp in milliseconds
    
  res.json({ epoch: now });
});

module.exports = router;
