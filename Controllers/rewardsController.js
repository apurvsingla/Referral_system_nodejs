const mailer = require('../mailers/referral_mailer');
const Reward = require('../models/rewards');
const User = require('../models/user');
const nodeMailer = require('../Config/nodeMailer');


module.exports.reward = async (req,res) => {
    let reward = await User.findOne();
    if(reward){
        return res.render('rewards');
    }else{
        console.log("error in rewards")
        return res.redirect('/');
    }
}

module.exports.sendReward = async (req,res) => {
    try {
        let reward = await User.findOne({userRefferalCode: req.params.userRefferalCode});
        if(!reward){
            return console.log("error!!!!");
        }
        let email= req.body.email;
        let subject = "Refferal link: Enter this Code while signing up:" + reward.userRefferalCode; 
        let link = 'http://localhost:3000/users/register/'+ reward.userRefferalCode;
        nodeMailer.transporter.sendMail({
            from: 'Socialplatform123',
            to: email,
            subject: subject,
            html: link
        }, (err, info) => {
            if(err){
                console.log('mail',err);
                return;
            }
            console.log("mail delivered", info);
            return res.redirect("back");
        })
    } catch (error) {
        if(error){
            console.log(error);
            return res.redirect('/');
        }
    }
    
    
}

// module.exports.rewardId = (req,res) => {
    // let user = User.findOne();
    // let link = req.headers.host == 'localhost:3000' ? 'http://' : 'https://' + req.headers.host + "/signup/" + user.userRefferalLink;
//     let inviteLink = req.params.id.trim().split('-')[1].trim();
//     console.log(inviteLink);
// }

// module.exports.showRewards = async (req,res) => {
//     let currState = 0;
//     let user = await User.findOne({refferedBy: })
// }
