// app/routes.js

const express = require('express');
const router = express.Router();
const models = require('./models');

router.get('/', (req, res) => {
  models.getAllEntries((err, entries) => {
    res.render('index', { entries });
  });
});

router.post('/sign', (req, res) => {
  const { name, message } = req.body;
  models.createEntry(name, message);
  res.redirect('/');
});

module.exports = router;
