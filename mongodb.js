const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/bright_minds_hub';
let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  console.log('Connected to MongoDB');
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
