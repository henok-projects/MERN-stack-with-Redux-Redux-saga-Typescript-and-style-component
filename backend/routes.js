var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.get('/:id', function (req, res) {
   
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});

router.put('/', function(req, res){
    res.send('put route on things.');
});
router.delete('/', function(req, res){
    res.send('delete route on things.');
 });
 
 
//export this router to use in our index.js
module.exports = router;