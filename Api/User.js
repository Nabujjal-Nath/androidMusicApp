const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const userRoute = express.Router();
const bcrypt=require('bcrypt');


userRoute.post("/login",(req,res,next)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length<1){
            return res.status(200).json({  //401
              message:'auth_failed'
            });
        }
        const xyz=user[0].password
        bcrypt.compare(req.body.password,xyz,(err,result)=>{
            if(err){
                return res.status(200).json({ //401
                    message:'auth_failed'
                });
            }
            if(result){
                return res.status(200).json({
                    message:'auth_successful'
                });
            }
            res.status(200).json({ //401
                message:'auth_failed'
            });
        });
    }).catch(err=>{
        console.log(err);
        res.status(200).json({ //500
            error:err
        });
    });
});



userRoute.post("/signup",(req,res,next)=>{
   User.find({email:req.body.email}).exec().then(user=>{
       if(user.length>=1){
           return res.status(200).json({  //409
              message:'mail_exists'
           });
       }
       else{
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err)
            {
                return res.status(200).json({  //500
                    error:err
                });
            }
            else{
                const user=new User({
                    email:req.body.email,
                    password:hash
                    });
                user.save()
                .then(result=>{
                    console.log(result);
                    res.status(200).json({ //201
                        message:'user_created'
                    });
                }).catch(err=>{
                    console.log(err);
                    res.status(200).json({ //500
                        error:err
                    });
                });
            }
    
        });    
       }
   })
});
module.exports = userRoute;
