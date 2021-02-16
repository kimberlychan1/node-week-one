const express = require("express");
const app = express();
const upload = require("express-fileupload");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload());

app.use(express.static('folder'))

// let cache = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
    if(req.files){
        // Details of the file
        console.log(req.files)
        //file = input name
        var file = req.files.file;
        var filename = file.name;
        console.log(filename);

        // cache.push(file);
        
        file.mv('./upload/' + filename, function(err) {
            if (err) {
                res.send(err)
            } else {
                res.end()
                // console.log(cache);
            }
        });
        res.redirect('/')
    };
})

app.get('/uploaded-files', (req,res) => {
    const uploaded = fs.readdirSync('./upload/');
    res.json(uploaded);
})

app.get('/download', (req,res) => {
    let name = Object.keys(req.query)
    res.download(__dirname +`/upload/${name}`,`${name}`);
})

app.listen('8080', () => {
    console.log("Server started")
})