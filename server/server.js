import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get('/pizza', async (_req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const pizzas = await collection.find({}).toArray();
        res.json(pizzas);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Dough must have gone bad... No pizza for you!");
    }
});

app.post('/pizza/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        const pizzas = await collection.find({ 'topping_1': regex }).toArray();
        res.json(pizzas);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t taste right... Error searching for pizzas');
    }
});

app.put("/cart/addProduct", (req, res) => {
    if (req.body === undefined) {
        res.statusCode = 500;
        res.end();
        return;
    }
    res.end()
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});