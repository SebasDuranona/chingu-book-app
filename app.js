var port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

var express = require('express');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
// Setup Home Route

app.get('/', function(req, res){
    res.redirect('search');
});

// Setup Search Route

app.get('/search', function(req, res){
    res.render('search');
    
});

// Setup Results Route
app.get('/results', function(req, res){
    var search = req.query.search;
    request(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyB40wsGJ_19BGaXZffV6WWGenw6vKwd3Zo`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            console.log('Success!');
            res.render('results', {data:data}); //Render the results page
        }
    });    
});




// Server Setup
app.listen(port, function(){
    console.log('Server Started!');
});

