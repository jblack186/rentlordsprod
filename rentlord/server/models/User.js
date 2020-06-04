const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    username: String,
    wholeName: String,
    role: String,
    landlord: String,
    tenant: Array,
    address: String,
    picture: {
        type: String
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User