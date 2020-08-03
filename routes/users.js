const  express = require('express');
const  router = express.Router();
const authentication = require('../Controllers/authentication');
const passport = require('passport');
/* GET users listing. */
router.post('/create', authentication.create);

router.get('/register', authentication.signup);
router.get('/register/:userRefferalCode', authentication.reffered);

router.post('/create-session', passport.authenticate('local', {
  failureRedirect: '/users/login'
}), authentication.createSession);

router.get('/login', authentication.login);
router.get('/sign-out', authentication.destroySession);

module.exports = router;
