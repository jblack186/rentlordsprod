const mongoose = require('mongoose')
const {Schema} = mongoose

const electricalSchema = new Schema({
    body : String,
    _userId: {type: mongoose.Types.ObjectId, ref: 'Issues'},
    _userLandlordId: String,
    _userIssue: {type: Schema.Types.ObjectId, ref: 'Issues'},
    pending : {type : Boolean , default : true},
    recieved: {type: Boolean, default: false},
    completed: {type: Boolean, default: false},

})
mongoose.model('electrical', electricalSchema);

module.exports = electricalSchema