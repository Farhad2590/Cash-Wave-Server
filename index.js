const express = require('express')
const cors = require('cors')

//cashWave
//tmguutjI1anztT4O
require('dotenv').config()
const port = process.env.PORT || 9000
const app = express()

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
    ],
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cashWave:tmguutjI1anztT4O@cluster0.cd6vky8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const userCollection = client.db('cashWave').collection('users')

        // Save a user data in db
        app.post('/user', async (req, res) => {
            const userData = req.body

            const result = await userCollection.insertOne(userData)
            res.send(result)
        })
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello from CashWave Server....')
})

app.listen(port, () => console.log(`Server running on port ${port}`))