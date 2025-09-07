const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: ['http://localhost:5173', "https://college-booking-fafe3.firebaseapp.com"],
    credentials: true,
    optionalSuccessStatus: 200,
}
// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: "unauthorized access" })
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "unauthorized access" })
        }
        req.user = decoded;
    })
    next()
}


// const uri = "mongodb://localhost:27017";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o3yie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
app.get('/', (req, res) => {
    res.send("College Booking Server Is Running...");
})

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        app.post("/jwt", async (req, res) => {
            const email = req.body;
            const token = jwt.sign(email, process.env.SECRET_KEY, { expiresIn: '365d' })
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                })
                .send({ success: true })
        })
        app.get("/logout", async (req, res) => {
            res.clearCookie('token', {
                maxAge: 0,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
            })
                .send({ success: true })
        })

        const users = client.db('college-booking').collection('users');
        const colleges = client.db('college-booking').collection('colleges');
        const applyColleges = client.db('college-booking').collection('apply-colleges');
        const reviewCollection = client.db('college-booking').collection('reviews');



        app.post('/users', async (req, res) => {
            const userInfo = req.body;
            const filter = { email: userInfo.email }
            const existingUser = await users.findOne(filter);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await users.insertOne(userInfo);
            res.send(result)
        })
        app.get('/users', async (req, res) => {
            const result = await users.find().toArray();
            res.send(result);
        })

        // all colleges
        app.get('/colleges', async (req, res) => {
            const result = await colleges.find().toArray();
            res.send(result);
        })


        app.get('/college/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: new ObjectId(id) };
            const result = await colleges.findOne(query);
            res.send(result)
        })


        // college-registration
        app.post('/college-registration', async (req, res) => {
            const data = req.body;
            const result = await applyColleges.insertOne(data);
            res.send(result);
        })

        app.get('/colleges/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email)
            const query = { email };
            const result = await applyColleges.find(query).toArray();
            res.send(result);
        })

        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result);
        })
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('My simple server is running at: ', port)
})
