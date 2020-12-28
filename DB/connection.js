const mongoose=require('mongoose');
const URI= 'mongodb+srv://root:root@cluster0.aujvf.mongodb.net/muzik?retryWrites=true&w=majority';
const connectDB=async()=>{
    await mongoose.connect(URI,{useUnifiedTopology:true, useNewUrlParser:true,useCreateIndex: true});
    console.log('database connected...')
};
module.exports=connectDB;