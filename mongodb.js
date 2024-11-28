const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://SAKINA:sakina@cluster0.ew8zt.mongodb.net';
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
