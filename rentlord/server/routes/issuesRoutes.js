const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const { Schema } = mongoose;

const Issues = mongoose.model('issues')
const electrical = mongoose.model('electrical')
const Users = mongoose.model('user')
const plumbingSchema = require('../models/plumbingSchema');
const carpentrySchema = require('../models/carpentrySchema');
const electricalSchema = require('../models/electricalSchema');
const complaintsSchema = require('../models/complaintsSchema');
const Elec = mongoose.model('electrical', electricalSchema);

module.exports = (server) => {


    server.post('/api/issues', requireLogin, async (req, res) => {

        const { fromTenantMessage, toTenantMessage, _userLandlord } = req.body;
        
        console.log('usas',req.user)

        const issues = new Issues({    
            fromTenantMessage,
            toTenantMessage,
            // electrical: [electricalSchema],
            _user: req.user.id,
            _userName: req.user.wholeName,
            _userLandlord,
            // _userTenant,
            dateSent: Date.now()

        });

        try {
            res.status(201).json(issues)
            //This line saves the issues record to the database

            await issues.save();
            await electricalSchema.save();

          }
        catch(err) {
            res.send.status(422).send(err);
                }

    });

    server.get('/api/tenant-issues', async (req, res) => {
        try {
            const issue = await Issues.findOne({_user: req.user._id})
            console.log('first-iss',issue)
            res.status(200).json({ messages: issue.fromTenantMessage, plumbing: issue.plumbing, electrical: issue.electrical, carpentry: issue.carpentry, complaints: issue.complaints})
        }
        catch(err) {
            console.log(err)
        }
    })


    server.put('/api/plumbing', async (req, res) => {
        const { plumbing } = req.body;
        console.log()
        await Issues.findOneAndUpdate({_user: req.user._id}, {$push: {plumbing: {body: plumbing, pending: true, recieved: false, completed: false}}})
        try {
            res.status(202).json({body: plumbing, pending: true, recieved: false, completed: false})
        }
        catch(err) {
            console.log(err)
        }
    })
    
    server.put('/api/electrical', async (req, res) => {
        const { electrical } = req.body;
        // const theIssue = await Issues.
        await Issues.findOneAndUpdate({_user: req.user._id}, {$push: {electrical: {body: electrical}}})
        try {
            const electricals = new Elec({body: electrical, _userId: req.user._id, _userLandlordId: req.user.landlord})
            // electricals.save();

            res.status(202).json({body: 'electrical', pending: true, recieved: false, completed: false})
        }
        catch(err) {
            console.log(err)
        }

    })

    server.put('/api/carpentry', async (req, res) => {
        const { carpentry } = req.body;
        console.log()
        await Issues.findOneAndUpdate({_user: req.user._id}, {$push: {carpentry: {body: carpentry}}})
        try {
            res.status(202).json({body: carpentry, pending: true, recieved: false, completed: false})
        }
        catch(err) {
            console.log(err)
        }

    })
    
    server.put('/api/complaints', async (req, res) => {
        const { complaints } = req.body;
        console.log()
        await Issues.findOneAndUpdate({_user: req.user._id}, {$push: {complaints: {body: complaints}}})
        
        try {
            res.status(202).json({body: complaints, pending: true, recieved: false, completed: false})
        }
        catch(err) {
            console.log(err)
        }

    })
    
    server.put('/api/fromTenantMessage', async (req, res) => {
        try {
            const { message } = req.body;
            console.log()
            await Issues.findOneAndUpdate({_user: req.user._id}, {$push: {fromTenantMessage: `Tenant ${message}`}})    
            res.status(202).json(message)
        }
        catch(err) {
            console.log(err)
        }
    })

    server.put('/api/pending', async (req, res) => {
        const {ids, _user, situation} = await req.body;
        try {
            await Issues.findOneAndUpdate({_user: _user, [`${situation}._id`]: ids}, {"$set": {[`${situation}.$.pending`] : true, [`${situation}.$.recieved`]: false, [`${situation}.$.completed`]: false}})
            res.status(202).json(ids)


        }
        catch(err) {
            console.log(err)
        }
    })

    server.put('/api/recieved', async (req, res) => {
        const {ids, _user, situation} = await req.body;
        try {

            await Issues.findOneAndUpdate({_user: _user, [`${situation}._id`]: ids}, {"$set": {[`${situation}.$.pending`] : false, [`${situation}.$.recieved`]: true, [`${situation}.$.completed`]: false}})
            res.status(202).json(ids)

        
        }
        catch(err) {
            console.log(err)
        }
    })

    server.put('/api/completed', async (req, res) => {
        const {ids, _user, situation} = await req.body;
        try {

            await Issues.findOneAndUpdate({_user: _user, [`${situation}._id`]: ids}, {"$set": {[`${situation}.$.pending`] : false, [`${situation}.$.recieved`]: false, [`${situation}.$.completed`]: true}})
            res.status(202).json(ids)


        }
        catch(err) {
            console.log(err)
        }
    })


    //this route is for LandlordDashboard component - sending the user the tenants with their issues
    server.get('/api/tenants-issues', async (req, res) => {
        try {
            //grabbing the issues assigned t landlord
            const issues = await Issues.find({_userLandlord: req.user._id})
            //kindly sending it to lanlord
            res.status(200).json(issues)
    }
        catch(err) {
            console.log(err)
        }
    })


    server.get('/api/fromTenantMessages', async (req, res) => {
        try {
            const issue = await Issues.find({_userLandlord: req.user._id})
            var keys = await Object.keys(issue);
            var filtered = await keys.filter(function(key) {
                return issue[key]
            });
                        // const mess = await issue.find(item => {
            //     return item.fromTenantMessage === item.fromTenantMessage
            // })
            res.status(200).json(issue)
            console.log('iss', keys)
            console.log('ish', filtered)
        } catch(err) {
            console.log(err)
        }
    })

    server.post('/api/toTenantMessages', async (req, res) => {
        const {message, id} = req.body;
        try {
            Issues.findOneAndUpdate({_user: id})
        } catch(err) {
            console.log(err)
        }
    })
    server.put('/api/toTenantMessage', async (req, res) => {
        try {
            const { message, id } = req.body;
            console.log()
            await Issues.findOneAndUpdate({_user: id}, {$push: {fromTenantMessage: `You: ${message}`}})    
            res.status(202).json(message)
        }
        catch(err) {
            console.log(err)
        }
    })


};



            // recipients: recipients.split(',').map(id => ({ id: id.trim() })),

