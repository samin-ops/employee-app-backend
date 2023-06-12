const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', {
    
    name: {type: String,required: true},
    position: { type: String, required: true},
    office:  { type: String,required:true},
    salary: {type: Number,required: true}
});
module.exports = { Employee };