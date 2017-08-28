// data layer

var winston = require('winston');
var mongoose = require('mongoose');

var _ = require('lodash')



function get_sort_by(search_settings) {
    // ['order'] //asc, desc, ascending, descending, 1, or -1
    var sort_by = search_settings['sort_by']
    var order = search_settings['order'] //asc, desc, ascending, descending, 1, or -1
    if (_.isUndefined(search_settings.sort_by) || _.isUndefined(search_settings.order)) {
        return {}
    }
    return {
        [search_settings.sort_by]: order
    }
}

const queries = {

    'polarity': [
        {
            $group: {
                _id: "$polarity",
                count: { $sum: 1 }
            }
        }],
    'hate_users': [
        {
            $match: {
                polarity: 0,
            }
        },
        {
            $group: {
                _id: "$user",
                count: { $sum: 1 }
            }
        }
    ]
    
}

module.exports.get_agg = function (query, search_settings) {
    return new Promise(function (resolve, reject) {
        var Tweets = mongoose.model('Tweets');
        var usersProjection = {
            _id: false
        };
        var sort_by = get_sort_by(search_settings);
        if (_.isUndefined(sort_by) || _.isEmpty(sort_by)) {
            sort_by = { count: 1 };
        }
        query = queries[query]
        Tweets
            .aggregate(query).
            sort(sort_by).
            limit(search_settings['pagesize']).
            then((recs) => {
                return resolve(recs)
            })
            .catch((err) => {
                return reject(err)
            });
    })
}


module.exports.get = function (query, search_settings) {
    return new Promise(function (resolve, reject) {
        var Tweets = mongoose.model('Tweets');
        var usersProjection = {
            _id: false
        };
        var sort_by = get_sort_by(search_settings);

        Tweets
            .find(query, usersProjection).
            limit(search_settings['pagesize']).sort(sort_by).

            then((recs) => {
                return resolve(recs)
            })
            .catch((err) => {
                return reject(err)
            });
    })
}

/*

module.exports.get = function (query, search_settings) {
    
}
/*
module.exports.tweets = new Schema({
    polarity: { type: Number, required: true }, //the polarity of the tweet (0 = negative, 2 = neutral, 4 = positive)
    tweet_id: { type: Number, required: true, unique: true }, //the id of the tweet (2087)
    date: { type: Date, required: true }, //the date of the tweet (Sat May 16 23:58:44 UTC 2009)
    query: { type: String, required: true }, // the query (lyx). If there is no query, then this value is NO_QUERY.
    user: {type: String,  required: true }, // the user that tweeted (robotickilldozr)
    text: {type: String,  required: true } // the text of the tweet (Lyx is cool)
})
*/