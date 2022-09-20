const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");



//User register route
router.post("/register",async function (req, res){
 
const find = await User.find({username:req.body.username});

if(find.length==0){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
      const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
         username:req.body.username
        });
        try {
          const user = await newUser.save();
          res.status(201).json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    }

    else{
        res.status(400).json("Username already exists");
    }
   
  })


  //User login route
router.post("/signin",async(req, res) => {
    try{
  const user = await User.findOne({username:req.body.username});
 
  if(user){
 
   
   const bytes = await bcrypt.compare(req.body.password, user.password);
  
   if(bytes){
    const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:"5d"});
    res.json({
      message : "Successfully logged in",
      userid : user._id,
      token,
      username:user.username
    })
    
   }
   else{
    res.status(401).json({
      message : "Invalid password"
    });
   }
  }
  else{
    res.status(401).json({
      message : "Invalid username"
    });
  }
  
    }
    catch(error){
      res.status(500).json({
        message : error
      });
    }
  })
  
  

  module.exports = router;