// tweets_router

// Public domain

const express = require('express')
const tweets_data_layer = require('../db/tweets_data_layer')
var _ = require('lodash')



// Defaults
const def_pagesize = 10;

// [end defaults]


module.exports.get_router = function get_router() {
    var routers = express.Router();

    // [Public Domain]
    routers.get('/', get_);
    // [End of Public Domain[]]


    routers.use('/agg/', is_auth);
    routers.get('/agg/:filter_id', get_agg);
    return routers;
}



function get_agg(req, res, next) {
    var search_setting = get_search_settings(req);
    var query = req.params.filter_id
    if (_.isUndefined(query)) {
        return next('filter not found')
    }
    tweets_data_layer.get_agg(query, search_setting)
        .then((records) => {
            res.json(records);
        }, (err) => { return next(err) })
        .catch(next);
}

function get_(req, res, next) {

    var search_setting = get_search_settings(req);
    var query = parse_query(req);
    tweets_data_layer.get(query, search_setting)
        .then((records) => {
            res.json(records);
        }, (err) => { return next(err) })
        .catch(next);

}


function is_auth(req, res, next) {
    // next('Unauthorized req')
    next()
}



function parse_query(req) {
    var req_query = req.query;
    var query = {}
    if (!req_query || Object.keys(req_query).length === 0) {
        return query;
    }

    if (has_value(req_query["polarity"])) {
        query['polarity'] = parseInt(req_query["polarity"])
    }
    if (has_value(req_query["user"])) {
        query['user'] = req_query["user"]
    }
    if (has_value(req_query["ref"])) {
        var ref_q = '@' + req_query["ref"]
        query['text'] = new RegExp(ref_q)
    }
    if (!_.isUndefined(req_query["has_query"])) {
        query['query'] = {
            "$ne": "NO_QUERY"
        }
    }

    return query;
}

function get_search_settings(req) {
    var pagesize = def_pagesize; // default value
    var sort_by = undefined;// default value
    var order = 1;//
    var def_val = {
        "pagesize": pagesize,
        "sort_by": sort_by,
        "order": order
    };

    if (Object.keys(req.query).length === 0) {
        return def_val;
    }


    if (req.query.pagesize) {
        def_val["pagesize"] = parseInt(req.query.pagesize);
    }
    if (req.query.sortby) {
        def_val["sort_by"] = req.query.sortby;
    }
    if (req.query.order) {
        def_val["order"] = req.query.order;
    }
    return def_val;
}



function has_value(item) {
    if (!_.isUndefined(item) && !_.isEmpty(item)) {
        return true;
    }
    return false;
}


