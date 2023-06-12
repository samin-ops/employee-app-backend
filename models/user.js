
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema for user
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min:6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max:255,
        min: 6
    },
    password:{
        type: String,
        required: true,
        max:1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }

});
// define the model for User
let User;
if(mongoose.models.User){
    User= mongoose.model('User');
}else{
    User = mongoose.model('User', userSchema);
}

module.exports = User;
