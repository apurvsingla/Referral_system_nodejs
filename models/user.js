const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userRefferalCode:{
        type: String,
        default: function () { 
            let hash = 0;
            for (let i= 0; i<this.email.length; i++){
                hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
            }
            let res = (hash & 0x00ffffff).toString(16).toUpperCase();
            return "00000".substring(0,6 - res.length) + res;
         }
    },
    refferedBy: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userReffered: {
        type: Number,
        default: 0
    },
    rewards: {
        type: Number,
        default: 0
    }
}, {
    timestams: true
});


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const User = mongoose.model('User', userSchema);
module.exports = User;