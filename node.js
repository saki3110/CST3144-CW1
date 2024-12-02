const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
const uri = 'mongodb+srv://SAKINA:sakina@cluster0.ew8zt.mongodb.net';
let db, lessonsCollection, ordersCollection;

// Connect to MongoDB
async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db("BrightMindsHub");
        lessonsCollection = db.collection("lessons");
        ordersCollection = db.collection("orders");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Logger Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static files
app.use('/images', express.static('images'));



// API Routes
app.get('/lessons', async (req, res) => {
    try {
        const lessons = await lessonsCollection.find().toArray();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lessons' });
    }
});

app.post('/order', async (req, res) => {
    try {
        const { name, phone, lessonIDs, numberOfSpaces } = req.body;
        const order = { name, phone, lessonIDs, numberOfSpaces };
        await ordersCollection.insertOne(order);
        res.json({ message: 'Order placed successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
});
app.post('/order', async (req, res) => {
    const { lessonIDs } = req.body;

    try {
        for (const id of lessonIDs) {
            await Lesson.updateOne({ _id: id }, { $inc: { spaces: -1 } });
        }
        res.status(200).send('Order placed successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error placing order');
    }
});

app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const lessons = await lessonsCollection.find({
            $or: [
                { topic: new RegExp(query, 'i') },
                { location: new RegExp(query, 'i') },
                { price: { $regex: query, $options: 'i' } },
                { space: { $regex: query, $options: 'i' } }
            ]
        }).toArray();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: 'Failed to perform search' });
    }
});

// Start server after connecting to the database
const PORT = 3000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
