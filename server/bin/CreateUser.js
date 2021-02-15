const mongoose = require('mongoose')
const mongoUser = 'inventoryAknots';
const mongoPasswd = 'Aknots2021';
const mongoDBName = 'AknotsDataBase';
const mongoServer = 'inventoryd.ro5pk.mongodb.net';
const url =
  `mongodb+srv://${mongoUser}:${mongoPasswd}` +
  `@${mongoServer}/${mongoDBName}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', (_) =>
  console.log('MongoDB is now connected:', `${mongoUser}@${mongoServer}/${mongoDBName}`)
);
db.on('error', (err) => console.error('MongoDB connection error!', err));

const User = require('../models/User')

if (process.argv.length < 4) {
    throw new Error('Usage: createUser <email> <password>')
}

const email = process.argv[2]
const password = process.argv[3]

var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    //below line hashes the passowrd and provides it in the function
    bcrypt.hash(password, salt, function(err, hash) {
        // Stores the hash in your password DB.
        User
        .create({email, password:hash})
        .then((createdUser) => {
            console.log('created user:', createdUser)
        })
        .then(() => {
            return mongoose.connection.close()
        })
        .catch((error) => {
            console.log('Error creating user: ', error)
        })
    });
});

