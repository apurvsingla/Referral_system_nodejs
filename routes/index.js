const  express = require('express');
const  router = express.Router();
const indexController = require('../Controllers/indexController');

/* GET home page. */
router.get('/', indexController.home);

router.use('/users', require('./users'));
router.use('/rewards', require('./rewards'));

module.exports = router;
