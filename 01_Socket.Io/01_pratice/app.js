const app = require("express")();
const http = require('http').Server(app);

const path = require("path");

app.get('/', function (req, res) {

    let options = {
        root: path.join(__dirname)
    }
    let fileName = 'index.html';

    res.sendFile(fileName, options);
})

http.listen(5000, function () {
    console.log("Server running on 5000");
});