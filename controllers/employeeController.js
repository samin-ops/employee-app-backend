const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const  {Employee } = require('../models/employee');
const auth = require('../auth/verifytoken');


// => localhost: 3000/employees
router.get('/', auth, async (_req, res)=>{
    try {
      let cursor = Employee.find();
      let result = await cursor;
      if(result.length>0){
        res.status(200).json(result)
      }else{
        res.status(204).json({msg:"Error is retriving in Employees"})
      }
    } catch (error) {
        console.log(error);
        res.status(501).json(error)
        
    }
    
});
// Get employee by ID
router.get('/:id', auth, async (req, res)=>{
    try {
        const id = ObjectID.isValid(req.params.id) ;
        if(!id) res.status(400).json({msg:`No record with geven id, ${req.params.id}`})
        let data = Employee.findById(id) 
        let result = await data
        if(result.length>0){
            res.status(200).json(result[0])
        }else{
            res.status(204).json({msg:"Employee does not exist !"})
        }
        
    } catch (err) {
        console.log(err);
        res.status(501).json(err)
        
    }
    
});

// Add an employee
router.post('/', auth, async (req, res)=>{
    try {
        let emp = new Employee({
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        });
       await  emp.save()
                res.send(doc);   
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }        
});

//Update employee
router.put('/:id', auth, async (req, res)=>{
    try {
        if(!ObjectID.isValid(req.params.id)){
            res.status(400).send(`No record with geven id, ${req.params.id}` )
        }
        let emp = {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        };
       let data =  Employee.findByIdAndUpdate(req.params.id,{$set:emp}, {new: true})
       let result = await data;
       if(result.matchedCount == 1){
           res.status(200).json({msg:"Employee updated successfully"});
       }else{
        res.status(404).json({msg:"Employee does not exist"})
       }
        
    } catch (err) {
        console.log(err);
        res.status(501).json(err);
        
    }

});

//Delete mployee 
router.delete('/:id', auth, async(req, res)=>{
    try {
        if(!ObjectID.isValid(req.params.id))res.status(400).send(`No record with geven id, ${req.params.id}` )
       let data =  Employee.findByIdAndDelete(req.params.id)
        let result = await data 
        if(result.deletedCount == 1){
            res.status(200).json({msg:"Employee deleted successfully"})
        }else{
            res.status(204).json({msg:"Error in employee Delete !"})

        }
    } catch (err) {
        console.log(err);
        res.status(501).json(err)
        
    }
});


module.exports = router;