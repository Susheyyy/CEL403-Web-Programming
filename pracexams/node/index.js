const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pracexam").then(()=>{console.log("Mongo Connected")}).catch((error)=>{console.log("some error")});
//mongoos.connect().then(()=>{}).catch(()=>{});

const StudentSchema = new mongoose.Schema({
    name: String,
    prn: Number,
    course: String
})

//const anyschema = new mongoose.Schema({})

const Student = mongoose.model("Student",StudentSchema);

//const any = mongoose.model("any",anyschema);

app.get('/',async(req,res)=>{
     const result = await Student.find();
     console.log(result);
     res.json({data:result});
    })

app.post('/add',async (req,res)=>{
    const {name,prn,course}=req.body;
    console.log(name," ",prn," ",course);
    res.json({message:"keep meowing"});
    const newstudent=new Student({
        name,
        prn,
        course
    });
    await newstudent.save();
})

app.post('/delete',async (req,res)=>{
    const {prn}=req.body;
    console.log(prn);
    await Student.deleteOne({prn:prn});
    res.json({message:"keep meowing"});
    
    
})

app.listen(5000,()=>{
    console.log("website live at port 5000")
})