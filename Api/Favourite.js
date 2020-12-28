const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Favourite = require('../DB/Favourite');
const Song = require('../DB/Song');
const User=require('../DB/User');
const { use } = require('./User');
const userFavourite = express.Router();
mongoose.set('useFindAndModify', false);

userFavourite.post("/delete_fav",async(req,res,next)=>{
    let ip=req.ip.substring(7);
       console.log("Request Method: POST");
       console.log("Ip:",ip);
       console.log("Endpoint: /delete_fav");
       console.log('\n')

   await Favourite.findOneAndUpdate({"email":req.body.email},{"$pull":{id:req.body.id}}).then((result) => {       
        return res.json({
            status: "success"
        })
    })
    .catch(error=>{
        return res.json({
            status: "failed"
        })
    })
})


userFavourite.get("/get_favour/:email_id",async(req,res)=>{
       let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /get_favour");
       console.log('\n')

    var fav=[];
    User.find({}).then((user)=>{
         var mail=req.params.email_id;
         var status=0;
        for(var i=0;i<user.length;i++)
        {
            if(user[i].email==mail)
            {
               status=1
               
            }
        }
        if(status==0)
      {
         return res.json({})
      }     
   })
    await Favourite.find({}).then((user)=>{
        var mail=req.params.email_id;
      //  console.log(mail);
      //  console.log(user);
        for(var i=0;i<user.length;i++)
        {
            if(user[i].email==mail)
            {
               
                fav=user[i].id.slice();
            }
        }   
        
      
        
    });
   

    Song.find({}).then((songs) => {
       // console.log(fav);
        var arr=[];
        var obj={}
	    for(var i=0;i<songs.length;i++)
	    { 
            
            if(fav.includes(songs[i]._id))
            {
              
              obj={  
                   "_id":songs[i]._id,
		            "link":'http://35.154.208.123:3000/s_name'+songs[i].link.slice(1),
                    "song":songs[i].song,
                    "artist":songs[i].artist, 
                    "icon":'http://35.154.208.123:3000/poster'+songs[i].icon.slice(1),
                    "genre":songs[i].genre,
                    "language":songs[i].language,
                    "isFavourite":true
             }
             arr.push(obj);
        }
     }
        res.send(arr);
       // console.log(songs);
    }).catch((e) => {

    })
  
})


userFavourite.post("/favour",async(req,res,next)=>{
              let ip=req.ip.substring(7);
             console.log("Request Method: POST");
             console.log("Ip:",ip);
            console.log("Endpoint: /Favourite");
            console.log('\n')

             Favourite.findOneAndUpdate({"email":req.body.email},{"$push":{id:req.body.id}}).then((result) => {       
                return res.status(201).json({
                    status: "success",
                });
                
            }).catch((error) => {
                // return res.status(500).json({
                //     status: "Failed",
                // });
            });      
     Favourite.find({email:req.body.email}).exec().then(user=>{ 
        if(user<1)
        {
            const{email,id}=req.body;
            let obj={};
            obj.email=email;
            obj.id=id;
            let favouriteModel=new Favourite(obj);
            favouriteModel.save();
            // res.json(favouriteModel);
        }
     })
    
})


module.exports = userFavourite;