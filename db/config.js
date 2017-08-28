var logger = require('winston')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schemes = require('./schemes')
const config = require('../config')

module.exports = function(cb) {

    // schemes.tweets.index({tweet_text: 'text', tweet_query: 'text'})
    
  mongoose.set('debug', true);

    var mongo_uri = config.mongo_uri

    mongoose.Promise = global.Promise;
    logger.info('Using mongo connection: ', mongo_uri)
    var promise = mongoose.connect(mongo_uri, {
        useMongoClient: true
    }).then(function (db) {
        logger.info('Db connected');
        mongoose.model('Tweets', schemes.tweets);
        cb();
    }).catch(function(err){
        logger.error(err);
    });


    return mongo_uri
}
