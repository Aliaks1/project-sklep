const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Подключение к SQLite
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) console.error('Błąd połączenia z bazą danych:', err.message);
    else console.log('Połączono z bazą danych SQLite');
});

// Создание таблицы products
db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER NOT NULL
)`);

// CRUD Endpoints
app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/products', (req, res) => {
    const { name, price, category, stock } = req.body;
    if (!name || price == null || !category || stock == null)
        return res.status(400).json({ error: "Brak wymaganych danych" });

    db.run('INSERT INTO products(name, price, category, stock) VALUES (?, ?, ?, ?)',
        [name, price, category, stock],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        });
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, category, stock } = req.body;

    db.run('UPDATE products SET name=?, price=?, category=?, stock=? WHERE id=?',
        [name, price, category, stock, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Nie znaleziono produktu" });
            res.json({ message: "Zaktualizowano produkt" });
        });
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM products WHERE id=?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Nie znaleziono produktu" });
        res.json({ message: "Usunięto produkt" });
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server działa na http://localhost:${port}`);
});
