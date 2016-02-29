var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

});

router.post('/hmmm', function(req, res) {
  console.log('POSTING' + req.body);
  res.send('POST request to the homepage');
});

router.put('/', function(req, res) {
  console.log('PUTING: ' + req.headers);
});

router.post('/metadata/', function (req, res) {

});


module.exports = router;
