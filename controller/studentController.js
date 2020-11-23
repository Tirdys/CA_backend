const express = require('express');

const mongoose = require('mongoose');

const Student = mongoose.model('Student');

const router = express.Router();

router.get('/',(req,res) =>{
    res.render('student/addOrEdit.hbs',{
        viewTitle:'Insert Student'
    })
})

router.post('/',(req,res) => {
    insertRecord(req,res);
})


function insertRecord(req,res){
    var student = new Student();
    student.fullName = req.body.fullName;
    student.age = req.body.age;
    student.email = req.body.email;
    student.Schoolpaid = req.body.Schoolpaid;

    if(student.fullName == "" || student.age == "" || student.email == "" || student.Schoolpaid == ""){
        res.render('student/addOrEdit',({
            viewTitle:'Insert Student',
            error:'Enter all the details',
            student:req.body
        }))

        return;
    }
    

    student.save((err,doc) => {
        if(!err){
            res.redirect('student/list');
        }
        else {

            if(err.name == "ValidationError"){
                handleValidationError(err,req.body);
                res.render('student/addOrEdit',({
                    viewTitle:'Insert Student',
                    student:req.body
                }))
            }
            console.log("An error is there in inserting the records" + err);
        }
    })
}

router.get('/list',(req,res) => {
    Student.find((err,docs) => {
        if(!err){
            res.render('student/list',{
                list:docs
            })
        }
    })
})

function handleValidationError(err,body)
{
    for(field in err.errors)
    {
        switch(err.errors[field].path)
        {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;

            case 'email':
                body['emailError'] = err.error[field].message;
                break;

            default:

                break;

        }
    }
}

module.exports = router;