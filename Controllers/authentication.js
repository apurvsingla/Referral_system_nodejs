const User = require('../models/user');
const { reward } = require('./rewardsController');


module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log('error! please check the details');
            return;
        }
        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log('error in creating user');
                    return;
                }
                return res.redirect('/users/login');
            });
        } else {
            return res.redirect('back');
        }
    });
};


module.exports.createSession = async function(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
            return res.redirect('back');
        }
        return res.redirect('/');

    } catch (err) {
        console.log('********', err);
        return;
    }
};

module.exports.signup = (req,res) => {
    return res.render('signup');
};

module.exports.login = (req,res) => {
    return res.render('login');
};

module.exports.destroySession = function(req, res) {
    req.logout();
    return res.redirect('/');
};

module.exports.reffered = async (req,res) => {
    try {
        let refferedByUser = User.findOne({userRefferalCode: req.params.userRefferalCode});
        if(!refferedByUser){
            return console.log('error in finding the refer');
        }
        if(refferedByUser){
            // for weekends and holidays
            let currDate = new Date();
            let currDay = currDate.getDay();
            let currDe = currDate.getDate();
            let currMonth = currDate.getMonth();
            if((currDay == 6 || currDay == 7) || 
               (currDe == 28 && currMonth == 3) || 
               (currDe == 4 && currMonth == 11) || 
               (currDe == 3 && currMonth == 8) || 
               (currDe == 15 && currMonth == 8) || 
               (currDe == 31 && currMonth == 12)){
                let updatedUser = await User.updateOne(refferedByUser, {$inc: {rewards: 30}}, {
                    new: true,
                    upsert: true
                });
                let updatedUserValue = await User.updateOne(refferedByUser, { $inc: {userReffered:1}}, {
                    new: true,
                    upsert: true
                });
                if(updatedUser){
                    return res.redirect('/users/register');
                }else{
                    return console.log('error!!!!!!')
                }
            } else{
                let updatedUser = await User.updateOne(refferedByUser, {$inc: {rewards: 10}}, {
                    new: true,
                    upsert: true
                });
                let updatedUserValue = await User.updateOne(refferedByUser, { $inc: {userReffered:1}}, {
                    new: true,
                    upsert: true
                });
                if(updatedUser){
                    return res.redirect('/users/register');
                }else{
                    return console.log('error!!!!!!')
                }
            }          
        }
    }catch (error) {
        if(error){
            console.log("error in reffered user", error);
        }
    } 
};