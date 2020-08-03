module.exports.home = (req,res) => {
    if (req.isAuthenticated()) {
        res.render('index');
    }else{
        res.render('login');
    }
};