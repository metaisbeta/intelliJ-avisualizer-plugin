const express = require('express');
const path = require('path')
const port = 8080;
const app = express();

app.use(express.static('dist/avisualizer'))
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile('index.html',{root:__dirname})
});


app.listen(port, () => {
    console.log("Server is listening on port "+port);
});
