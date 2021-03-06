const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

//引入users.js
const users = require('./api/users');
//引入profiles.js
const profiles = require('./api/profiles');

//引入 DB config
const db = require('./config/keys').mongoURI;

//使用body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Connect to mongodb
mongoose
    .connect(db,{userNewUrlParser:true})
    .then(()=>{
    console.log('MongoDB Connected');})
    .catch((err)=>{console.log(err);})


//初始化 passport
app.use(passport.initialize());

require('./config/passport')(passport);

app.get('/',(req, res)=>{
    res.send("Hello World!");
});

//使用routers
app.use('/api/users',users);
app.use('/api/profiles',profiles);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('Server running on port ${port}');
});







