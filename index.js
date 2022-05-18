//express
//npm init
//npm i cors express mongodb dotenv (nodemon already installed)

const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
//DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process.
require("dotenv").config();
// middleware
const cors = require("cors");
const res = require('express/lib/response');
//CORS allows you to configure the web API's security. It has to do with allowing other domains to make requests against your web API. For example, if you had your web API on one server and your web app on another you could configure CORS in your Web API to allow your web app to make calls to your web API.
app.use(cors());
app.use(express.json());

//connecting database // START WITH A TEST RUN BASIC CONNECT
// Then connect from node mongo docs

const uri = "mongodb+srv://pardon:pardon@cluster0.znyio.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const appointmentsCollection = client.db("demystify_backend").collection("appointments");

        //get all products
        app.get("/products", async (req, res) => {
            const query = {};
            const cursor = appointmentsCollection.find(query);
            //we will wait for cursor to load all products then run toArray() method
            const result = await cursor.toArray();
            res.send(result);
        })

        //get one product
        app.get("/products/:id", async (req, res) => {
            //id information from request params
            const id = req.params.id;
            const query = { _id: Number(id) };
            //one item so we don't use toArray()
            const result = await appointmentsCollection.findOne(query)
            res.send(result)

            //update item - PUT
            app.put("/products/:id", async (req, res) => {
                const id = req.params.id;
                const filter = { _id: Number(id) };
                const updatedItem = req.body;
                const options = { upsert: true };
                const updateDetails = {
                    $set: {
                        name: updatedItem.name,
                    }
                };
                const result = await appointmentsCollection.updateOne(filter, updateDetails, options);
                res.send(result);
            })

            //delete operation
            app.delete("/products/:id", async (req, res) => {
                const id = req.params.id;
                const query = { _id: Number(id) };
                const result = await appointmentsCollection.deleteOne(query);
                res.send(result)
            })
        })
    }
    finally {

    }
}
run().catch(console.dir);


//This app starts a server and listens on port 5000 for connections. The app responds with “Hello from the other side.” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.
app.get("/", (req, res) => {
    res.send("Hello from the other side.");
})

app.listen(port, () => {
    console.log(`Port is running at ${port}`);
})