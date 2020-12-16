const express=require('express');
const connectDB=require('./DB/connection');
const router= require('./Api/Song')
const app=express();

connectDB();
app.use(express.json({extended:false}))
app.use(router);
// app.use('/api/songModel',require('./Api/Song'));
// app.use('/list',require('./Api/Song'));
const Port=process.env.Port || 3000;

app.listen(Port, () => {
    console.log('Server is up at ' + Port);
})