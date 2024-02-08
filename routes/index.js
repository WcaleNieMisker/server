const express = require('express');
const router = express.Router();

// Definiowanie trasy dla strony głównej
router.get('/', (req, res) => {
  res.send('Witaj na stronie głównej');
});

// Definiowanie trasy dla informacji o aplikacji
router.get('/about', (req, res) => {
  res.send('Informacje o aplikacji');
});

module.exports = router;
