const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone_no: {type: String, unique: true},
    user_name: {type: String, unique: true},
    password: {type: String},
    token: {type: String, default: null}
})


module.exports = mongoose.model('user', userSchema);
