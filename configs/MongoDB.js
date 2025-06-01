const mongoose = require('mongoose');
require('dotenv').config();

const mongodbConnect = () => {
    mongoose.connect(process.env.MONGODB_CLUSTER_URL)
    .then(() => console.log(`Studynotion server successfully connected with MongoDB cluster`))
    .catch((err) => {
        console.log(`Studynotion server failed to connect with MongoDB cluster`);
        console.log(err);
        process.exit(1);
    });
}

module.exports = mongodbConnect;