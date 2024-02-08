const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const username = process.env.USER;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${username}:${password}@radiowezel.7ws5evf.mongodb.net/`;
const client = new MongoClient(uri);
const queue = [];

router.use(cors({
    origin: 'http://localhost:8080/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'username', 'password']
}));

router.get('/', async (req, res) => {
  queue.push(async () => {
    try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.setHeader('username', username);
      res.setHeader('password', password);
      const requestUsername = req.headers.username;
      const requestPassword = req.headers.password;
      if (requestUsername !== username || requestPassword !== password) {
        return res.status(401).json({ error: 'Nieprawidłowe uwierzytelnienie' });
      }
  
      await client.connect();
      const database = client.db("radiowezel");
      const collection = database.collection('tracks');
      const elements = await collection.find({}).toArray();

      res.json(elements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  })
  processQueue();
});

router.put('/:id', async (req, res) => {
  queue.push(async () => {
    try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.setHeader('username', process.env.USER);
      res.setHeader('password', process.env.PASSWORD);
      const requestUsername = req.headers.username;
      const requestPassword = req.headers.password;
      if (requestUsername !== username || requestPassword !== password) {
        return res.status(401).json({ error: 'Nieprawidłowe uwierzytelnienie' });
      }
  
      await client.connect();
      const database = client.db("radiowezel");
      const collection = database.collection('utwory');

      // Przyjmij dane do aktualizacji z żądania PUT
      // console.log(req);
      const data = req.body;
      const itemId = new ObjectId(req.params.id);


      // Znajdź odpowiedni element w bazie danych i zaktualizuj go
      await collection.updateOne({ "_id": itemId }, { $set: data });

      res.json({ message: 'Element został zaktualizowany' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd serwera' });
    } finally {
      await client.close();
    }
  });

  processQueue();
});

const processQueue = async () => {
  if (!queue.length) return;

  const nextRequest = queue.shift();
  await nextRequest();
  processQueue();
}

module.exports = router;
