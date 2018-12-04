const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/";

module.exports = function (app) {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
        .then((client) => {
            const db = client.db('extopo-full-stack');
            app.people = db.collection('people');
            app.users = db.collection('users');
            console.log('database connection established...')
        })
        .catch((err) => console.error(err))
};
