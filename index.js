require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

// defining multer instance
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req,file,callback) => {
      callback(null, file.fieldname + '-' + Date.now() + "-" + file.originalname);
    }
  })
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// handling file upload post request
app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
  if (!req.file) {
    return res.json({Error: "File upload failed."});
  };
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
