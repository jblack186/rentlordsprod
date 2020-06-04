require('dotenv').config();
const mongoose = require('mongoose');
const keys = require('./config/keys.js');


const server = require('./server.js');

mongoose.connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const db = mongoose.connection
db.on('error', error => console.log(error));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});



