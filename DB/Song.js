const mongoose=require('mongoose');
const song=new mongoose.Schema({
    link:{type:String,required:true},
    song:{type:String,required:true},
    artist:{type:String},
    genre:{type:String},
    icon:{type:String},
    language:{type:String}
});
module.exports=Song=mongoose.model('song',song);