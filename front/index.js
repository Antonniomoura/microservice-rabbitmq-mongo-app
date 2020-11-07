const express = require('express');
const app = express();
const PORT = 8000;

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render("index.html");
});

app.get('/list', function(req, res){
    res.render("list.html");
});

app.listen(PORT, () => {
    console.log(`Listing at port ${PORT}`)
})