const express = require('express');
const router = express.Router();
const Student = require('../models/students');
const mongoose = require('mongoose');
const checkauth = require('../middleware/auth');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
    cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null,  new Date().toISOString().replace(/:/g, '-') +  file.originalname );
    }
})

const upload = multer({storage: storage, limits:{
    fileSize: 1024*1024 * 5
}})



//Handling Incoming GET routes to retrieve all Students
router.get('/',  (req, res, next) => {
    Student.find()
    .select('firstname lastname email _id rollno  studentimage request school title contact')
    .exec()
    .then(docs =>{
        console.log(docs);
        const response = {
            count: docs.length,
            students: docs.map(doc =>{
                return {
                    firstname : doc.firstname,
                    lastname : doc.lastname,
                    email: doc.email,
                    rollno: doc.rollno,
                    studentimage:doc.studentimage,
                    school:doc.school,
                    title:doc.title,
                    contact:doc.contact,
                    _id: doc._id,
                    request : {
                        type : "GET",
                        url : "http://localhost:4000/student/"+ doc._id
                    }

                }
            })
        }
        res.status(200).json({
            message: "Handling GET request to /students",
            createdStudent: response

        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    
});

router.post('/',  upload.single('studentimage'),checkauth, (req, res, next) => {
   const student = new Student({
       _id: new  mongoose.Types.ObjectId(),
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       email: req.body.email,
       rollno: req.body.rollno,
       studentimage: req.file.path,
       school:req.body.school,
       title:req.body.title,
       contact:req.body.contact
   });
   student
   .save()
   .then(result => {
       console.log(result);

   })
   .catch(err => {
    console.log(err)
   });

   res.status(201).json({
    message: "Handling POST route to /students",
    createdStudent: student
});
});

router.get('/:studentId', (req, res, next) => {
    const id = req.params.studentId;
    Student.findById({_id:id})
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json({
            student: docs
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        });
    });
});

router.put("/:studentId", checkauth,(req, res, next) => {
    console.log(req.body)
    const id = req.params.studentId;
   Student.findOneAndUpdate({_id: id } ,{$set:{email:req.body.email, firstname:req.body.firstname,lastname:req.body.lastname, rollno:req.body.rollno}}, )
   .then(result =>{
       res.status(200).json({
           result:result
       })
   })
   .catch(err =>{
       res.status(500).json({
           messageError:err
       })
   })
});


router.delete('/:studentId', checkauth, (req, res, next) => {
const id = req.params.studentId;

Student.remove({_id:id})
.exec()
.then(result =>{
    res.status(200).json(result)
})
.catch( err =>{
    res.status(500).json({
        errorMessage: err
    })
})

});
module.exports = router;