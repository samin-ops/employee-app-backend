const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', (err)=>{
    if(!err){
        console.log('Mongodb connection succeded.');
    }
    else{
        console.log('Error in Database connection' + JSON.stringify(err, undefined, 2));
    }
});
module.exports = mongoose;