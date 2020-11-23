require('./models/db')

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const studentController = require('./controller/studentController');

var app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json()); // converting request data to a json format

app.set('views', path.join(__dirname,'/views/'));

app.engine('hbs',expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname + '/views/layouts/'
}))

app.set('view engine','hbs');


app.get('/',(req,res) => {
    res.send("Hello World!")
})

app.listen(5000,() =>{
    console.log("Server is running port 5000")
})

app.use('/student',studentController)