const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/guestbook.db');

const initDatabase = () => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS entry (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, message TEXT)');
  });
};

const createEntry = (name, message) => {
  db.run('INSERT INTO entry (name, message) VALUES (?, ?)', [name, message]);
};

const getAllEntries = (callback) => {
  db.all('SELECT * FROM entry', callback);
};

module.exports = { initDatabase, createEntry, getAllEntries };
