const express = require("express");
const upload = require("express-fileupload");
// const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload());

app.use(express.static('folder'))

let cache = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + path.sep + '/index.html');
})

app.post('/', (req, res) => {
    if(req.files){
        // Details of the file
        console.log(req.files)
        //file = input name
        var file = req.files.file;
        var filename = file.name;
        var filedata = file.data;
        
        cache[filename] = write(filename, filedata).then(read);
        
        res.redirect('/')
    }
})

app.get('/download/:id', (req,res) => {
    // console.log(req.params)
    // console.log(req.params.id)
    // console.log(cache[req.params.id])
    if (cache[req.params.id]){
        cache[req.params.id].then((body) => {
            console.log(body)
            res.send(body);
            console.log("completed");
        })
    } else {
        res.download(__dirname +`/upload/${req.params.id}`,`${req.params.id}`)
        console.log("Download completed");
    }
})

app.get('/uploaded-files', (req,res) => {
    const uploaded = fs.readdirSync('./upload/');
    console.log("uploaded")
    res.end(JSON.stringify(uploaded));
})

function write(filename, filedata) {
    console.log("uploading");
    return new Promise((res, rej) => {
        fs.writeFile(__dirname + path.sep + 'upload' + path.sep + filename, filedata, (err) => {
            if(err){
                console.log("write err")
                rej(err);
            } else {
                res(filename);
            }
        })
    })
}

function read(filename) {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + path.sep + 'upload' + path.sep + filename, (err, buffer) => {
            if(err) {
                console.log("read err")
                rej(err);
            } else {
                res(buffer);
            }
        })
    })
}


// app.get('/download', (req,res) => {
//     let name = Object.keys(req.query)
//     res.download(__dirname +`/upload/${name}`,`${name}`);
// })


app.listen('8080', () => {
    console.log("Server started")
})