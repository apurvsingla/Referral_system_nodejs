const  express = require('express');
const  router = express.Router();
const rewardsController = require('../Controllers/rewardsController');
const passport = require('passport');


router.get('/link', rewardsController.reward);
router.post('/send_link', rewardsController.sendReward);
// router.get('/link/:id', rewardsController.rewardId);


module.exports = router;
