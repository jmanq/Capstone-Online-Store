import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;
const cartCollection = process.env.CART_COLLECTION;
const orderCollection = process.env.ORDERS_COLLECTION;

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

app.post("/cart/addProduct", async (req, res) => {
    try {
        const product  = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(cartCollection);
        const result = await collection.insertOne(product);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding pizza');
    }
});

app.get("/cart/getCart", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(cartCollection);
        const cart = await collection.find({}).toArray();
        res.json(cart);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding pizza');
    }
});

app.delete('/cart/getCart/:Pizza_ID', async (req, res) => {
    try {
        const { Pizza_ID } = req.params;
        console.log("ID: ", parseInt(Pizza_ID));
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(cartCollection);
        const result = await collection.deleteOne({ Pizza_ID:parseInt(Pizza_ID) });
        if (result.deletedCount === 1) {
            res.status(200).send('Pizza deleted successfully');
        } else {
            res.status(404).send('Pizza not found');
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting Pizza');
    }
});

app.post("/cart/checkout", async (req, res) => {
    try {
        const product  = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(orderCollection);
        const result = await collection.insertOne(product);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding pizza');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});