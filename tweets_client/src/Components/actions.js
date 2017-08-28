import dispatcher from "../dispatcher"
import axios from "axios";

export function getTotalsByPolarity(q, settings) {
    var _settings = ''
    if(settings){
        _settings = "?" + settings
    }
    axios.get("/api/tweets/agg/"+q+_settings)
        .then(sendResponse)
        .catch((error) => {
            printerr(error);
            sendResponse({ data: [] });
        })
}


export function generalSearch(query) {
    axios.get("/api/tweets?" +query)
        .then(general_query)
        .catch((error) => {
            printerr(error);
            sendResponse({ data: [] });
        })
}

// utils
function printerr(error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    }
}


// Callbacks

function sendResponse(res) {
    dispatcher.dispatch(
        {
            type: "RECEIVE_AGG",
            results : res.data
        }
    );
}

function general_query(res) {
    dispatcher.dispatch(
        {
            type: "QUERY",
            results : res.data
        }
    );
}