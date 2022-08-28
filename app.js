const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const fs = require('fs');



app.use('/login', (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`userName`).value)" action="/" method="POST"><label>Username: </label><input id="userName" type="text" name="username"><button type="submit">Submit</button></form>');
});


app.use('/message', (req, res, next) => {
    // console.log('this is req 2 data', req.body);
    fs.writeFile('message.txt', `${req.body.username} : ${req.body.message}`, {'flag':'a'}, () => {

    });
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    
    // console.log('this is req 1 data',req.body);
    fs.readFile('./message.txt', 'utf8', (err, data) => {
        if(!err) {
            // console.log(data, '-->data');
            res.send(`<p>${data}</p><form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/message" method="POST">
            <input id="username" type="hidden" name="username">
            <label>Message: </label><input id="message" type="text" name="message">
            <button type="submit">Send</button></form>`);
        }
    });
});

app.listen(5000);