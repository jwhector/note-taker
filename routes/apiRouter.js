const router = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
    // console.log('GETTIN IT');
    const db = JSON.parse(fs.readFileSync('./db/db.json'));
    res.json(db);
});

router.post('/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json'));
    req.body.id = uniqid();
    db.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 4));
    res.json({message: 'Data received and modified.'});
});

router.delete('/notes/:id', (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json'));
    const new_db = db.filter(note => note.id != req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(new_db, null, 4));
    res.json(new_db);
});

module.exports = router;