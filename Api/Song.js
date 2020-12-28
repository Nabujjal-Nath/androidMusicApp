const express = require('express');
const mongoose = require('mongoose');
const Song = require('../DB/Song');
const Favourite = require('../DB/Favourite');
const route = express.Router();

route.post('/', async (req, res) => {
      let ip=req.ip.substring(7);
       console.log("Request Method: POST");
       console.log("Ip:",ip);
       console.log("Endpoint: /");
       console.log('\n')

    const { link, song, artist, genre, icon, language } = req.body;
    let obj = {};
    obj.link = link;
    obj.song = song;
    obj.artist = artist;
    obj.genre = genre;
    obj.icon = icon;
    obj.language = language;
    let songModel = new Song(obj);
    await songModel.save();
    res.json(songModel);
})

route.get('/list', (req, res) => {
    Song.find({}).then((songs) => {
	    for(var i=0;i<songs.length;i++)
	    {
		    songs[i].link = 'http://35.154.208.123:3000/s_name'+songs[i].link.slice(1);
                    songs[i].icon = 'http://35.154.208.123:3000/poster'+songs[i].icon.slice(1); 
	    }
        res.send(songs);
       // console.log(songs);
    }).catch((e) => {

    })
})


route.get('/artist', (req, res) => {
    Song.distinct('artist').then((songs) => {
       let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /artist");
       console.log('\n')
    
        var arr = [];
        var arr1 = [];
        var obj = {}
        for (var i = 0; i < songs.length; i++) {
            var singers = songs[i].split(',')
           
            if (!arr1.includes(singers[0])) {
               // console.log(singers[0],arr1.includes(singers[0]))
                arr1.push(singers[0]);
                var l=singers[0];
                var endpts='http://35.154.208.123:3000/artist/'+l;
                obj = { 
                        "title": singers[0],
                        "link":endpts,
                        "poster":'http://35.154.208.123:3000/poster/'+singers[0].replace(/ /g,"_")+'.jpg'
                        
                      }
                arr.push(obj);
            }
                 }
        res.send(arr);
    })
})

route.get('/language',(req,res)=>{
Song.find({}).then((songs)=>{
   let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /language");
       console.log('\n')

  var arr=[];
  var obj={};
  var arr1=[];
  for(var i=0;i<songs.length;i++){
   var lang=songs[i].language;
   if(!arr1.includes(lang)){
   arr1.push(lang);
   var endpts='http://35.154.208.123:3000/language/'+lang;
   obj={
         "title":lang,
         "link":endpts,
         "poster":'http://35.154.208.123:3000/poster/'+lang+'.jpg'         
       }
   arr.push(obj);
 }
}
res.send(arr);
})
})


route.get('/language/:language_name/:email_id',async(req,res)=>{
       let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /language");
       console.log('\n')


//    route.get("/fav/:email_id",(req,res)=>{
        var fav=[]
       await Favourite.find({}).then((user)=>{
            var mail=req.params.email_id;
           // console.log(mail);
          //  console.log(user);
            for(var i=0;i<user.length;i++)
            {
                if(user[i].email==mail)
                {
                   
                    fav=user[i].id.slice();
                }
            }   
        });
   // });



 await Song.find({}).then((songs)=>{
   var arr=[];
   var obj={};
    var lang=req.params.language_name;
     for (var i = 0; i < songs.length; i++) {
            if (songs[i].language.includes(lang) && fav.includes(songs[i]._id)) {
                // songs[i].link = 'http://35.154.208.123:3000/s_name' + songs[i].link.slice(1);
                // songs[i].icon = 'http://35.154.208.123:3000/poster'+songs[i].icon.slice(1);
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
           else if(songs[i].language.includes(lang) && !fav.includes(songs[i]._id)){
            obj={  
                "_id":songs[i]._id,
                 "link":'http://35.154.208.123:3000/s_name'+songs[i].link.slice(1),
                 "song":songs[i].song,
                 "artist":songs[i].artist, 
                 "icon":'http://35.154.208.123:3000/poster'+songs[i].icon.slice(1),
                 "genre":songs[i].genre,
                 "language":songs[i].language,
                 "isFavourite":false
          }
            arr.push(obj);

           }
        }

    res.send(arr);
})

})



route.get('/genre', (req, res) => {
    Song.find({}).then((songs) => {
       let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /genre");
       console.log('\n')


        var arr = [];
        var arr1 = [];
        var obj = {}
        for (var i = 0; i < songs.length; i++) {
           // console.log(songs[i].genre,songs[i].song);
            var singers = songs[i].genre.split(',')
         //   console.log(singers[0]);
            // if(singers.length==1 || singers.length==2){
            if (!arr1.includes(singers[0])) {
               // console.log(singers[0],arr1.includes(singers[0]))
                arr1.push(singers[0]);
                var l=singers[0];
                var endpts='http://35.154.208.123:3000/genre/'+l;
                obj = { 
                        "title": singers[0],
                        "link":endpts,
                        "poster":'http://35.154.208.123:3000/poster/'+singers[0].replace(/ /g,"_")+'.jpg'

                      }
                arr.push(obj);
            }
          
         // }
           if(singers.length>1){
            // console.log(arr1);
               if(!arr1.includes(singers[1])){
                // console.log(singers[1])
                 arr1.push(singers[1]);
                 l=singers[1];
                 endpts='http://35.154.208.123:3000/genre/'+l; 
                 
                  obj = { 
                        "title": singers[1],
                        "link":endpts,
                        "poster":'http://35.154.208.123:3000/poster/'+singers[1].replace(/ /g,"_")+'.jpg'
                      }
                arr.push(obj);

               }
             }
             //console.log(arr1)

                 }
        res.send(arr);
    })
})

route.get("/Edm",(req,res)=>{
  let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /Edm");
       console.log('\n')

 Song.find({}).then((songs)=>{
        var arr = [];
        var arr1 = [];
        var obj = {}
        for (var i = 0; i < songs.length; i++) {
            var gen = songs[i].genre.split(',')
            endpts='http://35.154.208.123:3000/Edm/'+gen[1];
            if(!arr1.includes(gen[1]) && gen[0]=="Edm"){
                 arr1.push(gen[1]);
              obj={
                     "title": gen[1],
                      "link":endpts,
                      "poster":'http://35.154.208.123:3000/poster/'+gen[1].replace(/ /g,"_")+'.jpg'
                               
                   }     
              arr.push(obj); 
        }

      }
      res.send(arr);
})

})


route.get('/Edm/:edm_name/:email_id',async(req,res)=>{
       let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /Edm");
       console.log('\n')

    var fav=[]
    await Favourite.find({}).then((user)=>{
        var mail=req.params.email_id;
       // console.log(mail);
      //  console.log(user);
        for(var i=0;i<user.length;i++)
        {
            if(user[i].email==mail)
            {
               
                fav=user[i].id.slice();
            }
        }   
    });

   await Song.find({}).then((songs)=>{
        var arr=[];
    var obj={};
     var edm=req.params.edm_name;
    //console.log(edm)
     
    for(var i=0; i<songs.length;i++) {
        var gen = songs[i].genre.split(',');
        if(edm==gen[1] && fav.includes(songs[i]._id)){
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
      else if(edm==gen[1] && !fav.includes(songs[i]._id)){
        obj={  
            "_id":songs[i]._id,
             "link":'http://35.154.208.123:3000/s_name'+songs[i].link.slice(1),
             "song":songs[i].song,
             "artist":songs[i].artist, 
             "icon":'http://35.154.208.123:3000/poster'+songs[i].icon.slice(1),
             "genre":songs[i].genre,
             "language":songs[i].language,
             "isFavourite":false
      }
        arr.push(obj);

      }
   
      
    }
     
      res.send(arr);
   });
  
  });



route.get('/genre/:genre_name/:email_id',async(req,res)=>{
     let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /genre");
       console.log('\n')


    var fav=[]
      await  Favourite.find({}).then((user)=>{
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
    
  await Song.find({}).then((songs)=>{
    var arr=[];
    var obj={};
        var genre=req.params.genre_name;
        genre=genre.charAt(0).toUpperCase() + genre.toLowerCase().slice(1);
        var charArr=genre.split('');
        for(var i=0;i<charArr.length;i++)
        {
            if(charArr[i]==' ')
            {
                charArr[i+1]=charArr[i+1].toUpperCase();
            }
        }
        var genreName=charArr.join("");
        // console.log(genreName);
       
        for (var i = 0; i < songs.length; i++) {
            if (songs[i].genre.includes(genreName)&& fav.includes(songs[i]._id)) {
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
            else if(songs[i].genre.includes(genreName) && !fav.includes(songs[i]._id)){
                obj={  
                    "_id":songs[i]._id,
                     "link":'http://35.154.208.123:3000/s_name'+songs[i].link.slice(1),
                     "song":songs[i].song,
                     "artist":songs[i].artist, 
                     "icon":'http://35.154.208.123:3000/poster'+songs[i].icon.slice(1),
                     "genre":songs[i].genre,
                     "language":songs[i].language,
                     "isFavourite":false
              }
                arr.push(obj);
    
               }


        }
        res.send(arr);

})

})

route.get('/artist/:artist_name/:email_id', async(req, res) => {
    let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /artist");
       console.log('\n')


    var fav=[]
       await Favourite.find({}).then((user)=>{
            var mail=req.params.email_id;
           // console.log(mail);
          //  console.log(user);
            for(var i=0;i<user.length;i++)
            {
                if(user[i].email==mail)
                {
                   
                    fav=user[i].id.slice();
                }
            }   
        });

  await Song.find({}).then((songs) => {
        var arr=[];
        var obj={};
        var art=req.params.artist_name;
        art=art.charAt(0).toUpperCase() + art.toLowerCase().slice(1);
        var charArr=art.split('');
        for(var i=0;i<charArr.length;i++)
        {
            if(charArr[i]==' ')
            {
                charArr[i+1]=charArr[i+1].toUpperCase();
            }
        }
        var artistName=charArr.join("");
       //  console.log(artistName);
       
        for (var i = 0; i < songs.length; i++) {
            if (songs[i].artist.includes(artistName) && fav.includes(songs[i]._id)) {
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
           else if(songs[i].artist.includes(artistName) && !fav.includes(songs[i]._id)) {
                obj={  
                    "_id":songs[i]._id,
                     "link":'http://35.154.208.123:3000/s_name'+songs[i].link.slice(1),
                     "song":songs[i].song,
                     "artist":songs[i].artist, 
                     "icon":'http://35.154.208.123:3000/poster'+songs[i].icon.slice(1),
                     "genre":songs[i].genre,
                     "language":songs[i].language,
                     "isFavourite":false
              }
                arr.push(obj);
            
            }
            
        }
        res.send(arr);
    })
})


route.get('/search/:search_name/:email_id',async(req,res)=>{
       var fav=[]
         let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Endpoint: /search");
       console.log('\n')

       await Favourite.find({}).then((user)=>{
            var mail=req.params.email_id;
           // console.log(mail);
          //  console.log(user);
            for(var i=0;i<user.length;i++)
            {
                if(user[i].email==mail)
                {
                   
                    fav=user[i].id.slice();
                }
            }   
        });

  await Song.find({}).then((songs)=>{
       var arr=[];
        var obj={};
       var search=req.params.search_name;
        search=search.charAt(0).toUpperCase() + search.toLowerCase().slice(1);
        var charArr=search.split('');
        for(var i=0;i<charArr.length;i++)
        {
            if(charArr[i]==' ')
            {
                charArr[i+1]=charArr[i+1].toUpperCase();
            }
        }
        var searchName=charArr.join("");
       // console.log(searchName);
         for (var i = 0; i < songs.length; i++) {
            if (songs[i].artist.includes(searchName) || songs[i].song.includes(searchName)) {
               if (fav.includes(songs[i]._id)) {
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
           else if(!fav.includes(songs[i]._id)) {
                obj={  
                    "_id":songs[i]._id,
                     "link":'http://35.154.208.123:3000/s_name'+songs[i].link.slice(1),
                     "song":songs[i].song,
                     "artist":songs[i].artist, 
                     "icon":'http://35.154.208.123:3000/poster'+songs[i].icon.slice(1),
                     "genre":songs[i].genre,
                     "language":songs[i].language,
                     "isFavourite":false
              }
                arr.push(obj);
            
            }
       
          }
        }
        res.send(arr);
        

})
 
})

route.get('/s_name/:name',(req,res)=>{
          var xyz=req.params.name;
            let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Requested File:",xyz);
       console.log('\n')

          
          res.sendFile('/home/ubuntu/androidApp/mucic_info/'+xyz);
          
})

route.get('/poster/:name',(req,res)=>{
       var xyz=req.params.name; 
        let ip=req.ip.substring(7);
       console.log("Request Method: GET");
       console.log("Ip:",ip);
       console.log("Requested File:",xyz);
       console.log('\n')

       res.sendFile('/home/ubuntu/androidApp/mucic_info/image/'+xyz);
})


module.exports = route;
