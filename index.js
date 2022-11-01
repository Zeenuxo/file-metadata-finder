const dotenv = require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require("multer");
const app = express();
const upload = multer({dest: 'uploads/'})


//MIDDLEWARE

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


//Serve the request with index.html, object.method(path, handler)
app.get('/', function(req,res){
  const filePath =__dirname + '/views/index.html';
    res.sendFile(filePath);
  });


//app.use(path, middlewareFunction), Gives us access to static assets like Style.css
const style = __dirname + '/public';
app.use('/public', express.static(style));



//Upload file and check success, upfile specified in index.html
app.post('/api/fileupload', upload.single('upfile'), function (req, res) {
  console.log(req.file)
  console.log(req.body)
  res.json({
    name: req.file.originalname, 
    type: req.file.mimetype, 
    size: req.file.size
  })
})



//Giving Port Access:
//Listen for requests - PORT specified in .env shell file
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Node app is listening at http://localhost:' + listener.address().port );
});

