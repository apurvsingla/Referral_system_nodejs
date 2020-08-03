const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});


const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;