const express = require('express');
const fileUpload = require('express-fileupload')

const app = express();
app.use(fileUpload());

app.use('/assets', express.static('build', { maxAge: '200d' }));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})



app.listen(8000, () => {
  console.log('Server started at port %d', 8000);
});
