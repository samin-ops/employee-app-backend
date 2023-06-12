const express = require('express');
const cors = require('cors');

require('./db');
const employeeController  = require('./controllers/employeeController');
const userController = require('./controllers/userController');

const app = express();
const port = 3000;

const corsOption = {
    origin:"http://127.0.0.1:4200"
}
app.use(express.urlencoded({extended: true})) 
app.use(express.json());
app.use(cors(corsOption));

app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (_req, res)=>{
    res.send('Happy welcome to my Employees app.')
})


//http://localhost:3000/api/employees
app.use('/api/employees', employeeController);

// http://localhost:3000/api/users/register or login
app.use('/api/users', userController);

app.listen(port, ()=> {
    console.log(`Serveur is listerning to port: ${port}.`)
});
