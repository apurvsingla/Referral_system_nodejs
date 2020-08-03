const nodeMailer = require('../Config/nodeMailer');

exports.newLink = (link) => {
    console.log('new Referral link', link);
    let htmlString = nodeMailer.renderTemplate({link: link}, '/referral.ejs')
    nodeMailer.transporter.sendMail({
        from: 'Socialplatform123',
        to: link,
        subject: "Refferal link for Reward Programme",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('mail',err);
            return;
        }
        console.log("mail delivered", info);
        return;
    })
}