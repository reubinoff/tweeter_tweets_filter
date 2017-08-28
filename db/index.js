const mongoose = require('mongoose')
var init_db = require('./config')
init_db(()=>{
    console.log('db done!')
});


