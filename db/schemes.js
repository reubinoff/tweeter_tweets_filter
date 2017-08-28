var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.tweets = new Schema({
    polarity: { type: Number, required: true }, //the polarity of the tweet (0 = negative, 2 = neutral, 4 = positive)
    tweet_id: { type: Number, required: true }, //the id of the tweet (2087)
    tweet_date: { type: Date, required: true, index: true }, //the date of the tweet (Sat May 16 23:58:44 UTC 2009)
    tweet_query: { type: String, required: true }, // the query (lyx). If there is no query, then this value is NO_QUERY.
    user: {type: String,  required: true }, // the user that tweeted (robotickilldozr)
    tweet_text: {type: String,  required: true } // the text of the tweet (Lyx is cool)
})