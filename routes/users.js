const express = require('express');
const router = express.Router();

// Pobieranie informacji o użytkownikach
router.get('/', (req, res) => {
  res.send('Lista użytkowników');
});

// Dodawanie nowego użytkownika
router.post('/', (req, res) => {
  const userData = req.body;
  // Logika dodawania nowego użytkownika do bazy danych
  res.send('Nowy użytkownik został dodany');
});

// Pobieranie szczegółów użytkownika o określonym ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  // Logika pobierania szczegółów użytkownika o określonym ID z bazy danych
  res.send(`Szczegóły użytkownika o ID ${userId}`);
});

module.exports = router;
