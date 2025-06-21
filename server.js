const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Database Connection
const db = new sqlite3.Database('./blood_bank.db', (err) => {
if (err) {
console.error(err.message);
}
console.log('Connected to the SQLite database.');
});

// Routes
// Get all donors
app.get('/donors', (req, res) => {
const query = 'SELECT * FROM blood_bank';
db.all(query, [], (err, rows) => {
if (err) {
res.status(500).json({ error: err.message });
} else {
res.json(rows);
}
});
});

// Add a donor
app.post('/add-donor', (req, res) => {
const { donor_name, blood_group, contact_number, last_donation_date } = req.body;
const query = `INSERT INTO blood_bank (donor_name, blood_group, contact_number, last_donation_date) VALUES (?, ?, ?, ?)`;
db.run(query, [donor_name, blood_group, contact_number, last_donation_date], function(err) {
if (err) {
res.status(500).json({ error: err.message });
} else {
res.json({ message: 'Donor added successfully', id: this.lastID });
}
});
});

// Delete a donor
app.delete('/delete-donor/:id', (req, res) => {
const { id } = req.params;
const query = 'DELETE FROM blood_bank WHERE id = ?';
db.run(query, [id], function(err) {
if (err) {
res.status(500).json({ error: err.message });
} else {
res.json({ message: 'Donor deleted successfully' });
}
});
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});
