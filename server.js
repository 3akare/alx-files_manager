const express = require('express');

const app = express();

app.use('/', require('./routes/index'));

app.listen(process.env.PORT || 5000, () => {
  console.log('Connected');
});
