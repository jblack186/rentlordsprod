const mongoose = require('mongoose');
const { Schema } = mongoose;
const carpentrySchema = require('./carpentrySchema');
const electricalSchema = require('./electricalSchema');
const plumbingSchema = require('./plumbingSchema');
const complaintsSchema = require('./complaintsSchema');

const issueSchema = new Schema({
    fromTenantMessage: Array,
    toTenantMessage: Array,
    plumbing: [plumbingSchema],
    electrical: [electricalSchema],
    carpentry: [carpentrySchema],
    complaints: [complaintsSchema],
    _user: {type : Schema.Types.ObjectId , ref : 'User'},
    _userName: String,
    _userLandlord: String,
    // _userTenant: String,
    dateSent: Date

});

mongoose.model('issues', issueSchema);

    // recipients: [RecipientSchema],
    // yes: { type: Number, default: 0 },
    // no: { type: Number, default: 0 },
    // dateSent: Date,
    // lastResponded: Date
