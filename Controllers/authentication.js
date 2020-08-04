const User = require('../models/user');
const { reward } = require('./rewardsController');


module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log('error! please check the details');
            return res.redirect('back');
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
        return res.redirect('back');
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
        User.findOne({userRefferalCode: req.params.userRefferalCode}, async function(err,user){
            if(err){
                return res.redirect('back');
            }
            if(refferedByUser){
                let currDate = new Date();
                let currDay = currDate.getDay();
                let currMonth = currDate.getMonth();
                let currDe = currDate.getDate();
                if((currDay == 6 || currDay == 7) ||  //weekends
                (currDe == 28 && currMonth == 3) || //national holidays
                (currDe == 4 && currMonth == 11) || 
                (currDe == 3 && currMonth == 8) || 
                (currDe == 15 && currMonth == 8) || 
                (currDe == 31 && currMonth == 12) && 
                (user.userReffered !== 4 || user.userReffered<4)){ //u[to 3 users
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
                        console.log('error!!!!!!');
                        return res.redirect('back')
                    }
                }else{
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
                        console.log('error!!!!!!');
                        return res.redirect('back');
                    }
                }       
            }
        })
    }catch (error) {
        if(error){
            console.log("error in reffered user", error);
            return res.redirect('back');
        }
    } 
};
