const express = require('express');

const app = express();

app.on('/', require('./routes/index'));

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Connected');
})