const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 4743;

const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

const connectWithRetry = () => {
  db.connect(err => {
    if (err) {
      console.error('Database connection failed:', err);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to MySQL database');
    }
  });
};

connectWithRetry();

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/data', (req, res) => {
  db.query('SELECT * FROM test_table', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
