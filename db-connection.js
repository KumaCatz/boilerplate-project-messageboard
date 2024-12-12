'use strict';

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

//Connect MongoDB
const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 });
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        );
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit if the database connection fails
    }
}

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing MongoDB connection...');
    await client.close();
    console.log('MongoDB connection closed.');
    process.exit(0); // Exit the app
});

module.exports = { connectDB, client };
