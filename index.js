


// [Requires]
var express = require('express')
var app = express()
var logger = require('winston')
var db = require('./db');
var logger = require('winston')
var routers = require('./routers')
const config = require('./config')
var morgan = require('morgan')

// [End Requires]


// [env constatns]
const port = process.env.PORT;
const app_name = config.app_name;
const pages_path = __dirname + "/tweets_client/build";

// [End constants]



// [Init services]

logger.add(logger.transports.File, { filename: app_name + ".log" })
logger.info("Application started!")
app.use(morgan('combined')); //'combined' outputs the Apache style LOGs


// [End Init services]






// [routers]
app.use(express.static(pages_path));   

app.use('/api/tweets', routers.tweets_router.get_router())

//default routing
app.use('/api',(err, req, res, next)=>{
  if(err){
    return res
    .status(404)
    .json(err);
  }
})
// [END router]



// [Server setup]

// Server startup
app.listen(port, function () {
  logger.info(app_name + ' listening on port ', port)
})

module.exports = app;

// [End server setup]


