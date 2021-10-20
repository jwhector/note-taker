const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(require('./routes/htmlRouter'));
app.use('/api/', require('./routes/apiRouter'));

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});