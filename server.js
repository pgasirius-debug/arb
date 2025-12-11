const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'books.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Функция для чтения данных
function readBooks() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Функция для сохранения данных
function saveBooks(books) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

// GET /api/books - получить все книги
app.get('/api/books', (req, res) => {
  const books = readBooks();
  res.json(books);
});

// POST /api/books - добавить новую книгу
app.post('/api/books', (req, res) => {
  const { title, author, status } = req.body;
  const books = readBooks();
  const newBook = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title,
    author,
    status: status || 'available'
  };
  books.push(newBook);
  saveBooks(books);
  res.json(newBook);
});

// PUT /api/books/:id - обновить книгу
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, status } = req.body;
  let books = readBooks();
  const bookIndex = books.findIndex(b => b.id === parseInt(id));
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  books[bookIndex] = { ...books[bookIndex], title, author, status };
  saveBooks(books);
  res.json(books[bookIndex]);
});

// DELETE /api/books/:id - удалить книгу
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  let books = readBooks();
  books = books.filter(b => b.id !== parseInt(id));
  saveBooks(books);
  res.json({ success: true });
});

// PATCH /api/books/:id/toggle - переключить статус
app.patch('/api/books/:id/toggle', (req, res) => {
  const { id } = req.params;
  let books = readBooks();
  const book = books.find(b => b.id === parseInt(id));
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  book.status = book.status === 'available' ? 'unavailable' : 'available';
  saveBooks(books);
  res.json(book);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
