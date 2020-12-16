const express = require('express');
const mongoose = require('mongoose');
const Song = require('../DB/Song');
const route = express.Router();

route.post('/', async (req, res) => {
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
		    songs[i].link = 'http://15.206.116.209:3000/s_name'+songs[i].link.slice(1);
                    songs[i].icon = 'http://15.206.116.209:3000/poster'+songs[i].icon.slice(1); 
	    }
        res.send(songs);
       // console.log(songs);
    }).catch((e) => {

    })
})


route.get('/artist', (req, res) => {
    Song.distinct('artist').then((songs) => {

        var arr = [];
        var arr1 = [];
        var obj = {}
        for (var i = 0; i < songs.length; i++) {
            var singers = songs[i].split(',')
           
            if (!arr1.includes(singers[0])) {
                console.log(singers[0],arr1.includes(singers[0]))
                arr1.push(singers[0]);
                var l=singers[0];
                var endpts='http://15.206.116.209:3000/artist/'+l;
                obj = { 
                        "artist": singers[0],
                        "link":endpts
                      }
                arr.push(obj);
            }
                 }
        res.send(arr);
    })
})




route.get('/genre', (req, res) => {
    Song.find({}).then((songs) => {

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
                var endpts='http://15.206.116.209:3000/genre/'+l;
                obj = { 
                        "genre": singers[0],
                        "link":endpts
                      }
                arr.push(obj);
            }
          
         // }
           if(singers.length>1){
             console.log(arr1);
               if(!arr1.includes(singers[1])){
                 console.log(singers[1])
                 arr1.push(singers[1]);
                 l=singers[1];
                 endpts='http://15.206.116.209:3000/genre/'+l; 
                 
                  obj = { 
                       "genre": singers[1],
                        "link":endpts
                      }
                arr.push(obj);

               }
             }
             //console.log(arr1)

                 }
        res.send(arr);
    })
})

route.get('/genre/:genre_name',(req,res)=>{
  Song.find({}).then((songs)=>{
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
         console.log(genreName);
        var arr = [];
        for (var i = 0; i < songs.length; i++) {
            if (songs[i].genre.includes(genreName)) {
                songs[i].link = 'http://15.206.116.209:3000/s_name' + songs[i].link.slice(1);
                songs[i].icon = 'http://15.206.116.209:3000/poster'+songs[i].icon.slice(1);
                arr.push(songs[i]);
            }
        }
        res.send(arr);

})

})


route.get('/artist/:artist_name', (req, res) => {
    Song.find({}).then((songs) => {
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
         console.log(artistName);
        var arr = [];
        for (var i = 0; i < songs.length; i++) {
            if (songs[i].artist.includes(artistName)) {
                songs[i].link = 'http://15.206.116.209:3000/s_name' + songs[i].link.slice(1);
                songs[i].icon = 'http://15.206.116.209:3000/poster'+songs[i].icon.slice(1);
                arr.push(songs[i]);
            }
        }
        res.send(arr);
    })
})

route.get('/search/:search_name',(req,res)=>{
  Song.find({}).then((songs)=>{
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
        console.log(searchName);
         var arr = [];
         for (var i = 0; i < songs.length; i++) {
            if (songs[i].artist.includes(searchName) || songs[i].song.includes(searchName)) {
                songs[i].link = 'http://15.206.116.209:3000/s_name' + songs[i].link.slice(1);
                arr.push(songs[i]);
            }
        }
        res.send(arr);
        

})
 
})

route.get('/s_name/:name',(req,res)=>{
          var xyz=req.params.name;
          res.sendFile('/home/ubuntu/androidApp/mucic_info/'+xyz);
          
})

route.get('/poster/:name',(req,res)=>{
       var xyz=req.params.name;
       res.sendFile('/home/ubuntu/androidApp/mucic_info/image/'+xyz);
})


module.exports = route;
