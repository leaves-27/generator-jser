import express from 'express';
import Home from './controller/home';

const router = express.Router();  
const home = new Home();

router.get('/*',home.get);

router.get('/api/*',function(req, res, next){
  res.json({
    a:"11",
    b:"22"
  });
})

module.exports = router;
