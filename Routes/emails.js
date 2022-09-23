const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Email = require("../models/Email");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authenticate = require("../verifytoken");


router.post("/send",authenticate,async function(req, res){

    const find = await User.find({username:req.body.recipient});
if(find.length>0){
const newmail = new Email({
        from : req.body.username,
        to:req.body.recipient,
        subject:req.body.subject,
        content:req.body.content,
        date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`

})
try{
    const mail = await newmail.save();
res.status(200).json("Mail sent successfully");
}
catch(err){
    res.status(500).json(err);
}}
else{
    res.status(401).json("Recipient not found");
}

})

router.get("/inbox/:id",authenticate,async function(req,res){
    try{
    const find = await Email.find({to:req.params.id});
    res.status(200).json(find);
    console.log(find);
    }
    catch(err){
console.log(err);
    }
})

router.get("/sent/:id",async function(req,res){
    try{
const find =await Email.find({from:req.params.id});
res.status(200).json(find);
    }
    catch(err){
console.log(err);
    }
})

router.get("/mailitems/:id",async function(req,res){
    try{
        const find = await Email.find({_id:req.params.id});
        res.status(200).json(find);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete("/mailitems/:id",async function(req,res){
    console.log(req.params.id);
try{
    await Email.findByIdAndDelete({_id:req.params.id});

res.status(200).json("Successfully deleted");
}
catch(err){
    res.status(500).json(err);
}

})
module.exports = router;