const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://SAKINA:sakina@cluster0.ew8zt.mongodb.net';
let db, lessons_collection, orders_collection;

async function connectDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("BrightMindsHub");
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
