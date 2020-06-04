const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Issues = mongoose.model('issues');
const upload = require('../middlewares/upload');


module.exports = (server) => {
  server.get('/auth/google', passport.authenticate('google', { 
      scope: ['profile', 'email']
    })

  )


    
server.put('/api/picture', async (req, res) => {
  const { url } = req.body
  console.log('url', url)
  try {
     await User.findOneAndUpdate({_id: req.user._id}, {picture: url})
      .then(pic => {
        res.status(200).json(pic)
      })
      .catch(err => {
        console.log(err)
      })
    
  } catch(err) {
    console.log(err)
  }


})

  server.get('/auth/google/callback', passport.authenticate('google'), async (req, res) => {
    //grabbing all users in database
    const existingUser = await User.find({})
    try {
      //finding user by id
       const user = await User.findById(req.user.id)
       console.log('yo, you there', user.role)
       //checking if user exists and what role they have in order to direct them accordingly
       if (existingUser && user.role === 'Tenant') {
         res.redirect('/tenant-dashboard')
       } else if (existingUser && user.role === 'Landlord') {
         res.redirect('/landlord-dashboard')
       } else {
         res.redirect('/role')
       }
    }
    catch (err){
      console.log(err)
    }
    
  
    }
   ); 

  server.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
  })

  server.get('/api/current_user', (req, res) => {
    res.send(req.user)
  });


  server.put('/api/role', async (req, res) => {
    const {role} = req.body;
    console.log(role);
    try {
      //finding id of new user then updating the blank role to selected role
      await User.findOneAndUpdate({_id: req.user._id}, {role: role})
  }
    catch(err) {
      console.log(err)
    }

  })

  //grabbing the tenant that is logged in
  server.get('/api/tenant', async (req, res) => {
    console.log(req.user.tenant)
      User.findById(req.user._id)
        .then(tenant => {
          res.status(200).json(tenant)
          console.log(tenant)
        })

  })

// grabbing the tenant's landlord by their id
  server.get('/api/landlord', async (req, res) => {
    console.log(req.user.landlord)
      User.findById(req.user.landlord)
        .then(land => {
          res.status(200).json(land)
          console.log(land)
        })
        .catch(err => {
          console.log(err)
        })

  })

  // grabbing all landlords - for role component
  server.get('/api/landlords', (req, res) => {
    console.log('hi',req.user)
    const landlords = User.find({role: 'Landlord'})
      .then(landlords => {
        console.log('land',landlords)
      res.status(200).json(landlords);
    
  })
  .catch(err => {
      console.log(err);
      res.send(err)
  })

  })

  //for LandlordDashboard-component grabbing the logged in landlord
  server.get('/api/landlord-info', async (req, res) => {
    console.log(req.user.landlord)
      User.findById(req.user._id)
        .then(landlord => {
          res.status(200).json(landlord)
          console.log(landlord)
        })

  })


// for Role component - updating the landlord scheme on tenant's record that is logged in
// then updating the chosen landlord's record as well
// lastly we are going into the issues scheme and finding -
//the issuues that match the logged in user and -
//changing the issues' "_userlandlord" to that users chosen landlord
  server.put('/api/landlords', async (req, res) => {
    const user = req.user
    const {landlord} = req.body
    try {
    await User.findOneAndUpdate({_id: req.user._id}, {landlord: landlord})
    await User.findOneAndUpdate({_id: landlord}, {$push: {tenant: user._id}})
    await Issues.findOneAndUpdate({_user: req.user._id}, {_userLandlord: landlord})

    }
    catch(err) {
      console.log(err)
    }
  })



};

