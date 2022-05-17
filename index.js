//express
//npm init
// npm i cors express mongodb dotenv (nodemon already installed)
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
//DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process.
require("dotenv").config();
// middleware
const cors = require("cors");
//CORS allows you to configure the web API's security. It has to do with allowing other domains to make requests against your web API. For example, if you had your web API on one server and your web app on another you could configure CORS in your Web API to allow your web app to make calls to your web API.
app.use(cors());
app.use(express.json());


//This app starts a server and listens on port 5000 for connections. The app responds with “Hello from the other side.” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.
app.get("/", (req, res) => {
    res.send("Hello from the other side.");
})

app.listen(port, () => {
    console.log(`Port is running at ${port}`);
})