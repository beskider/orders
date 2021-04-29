const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");

const app = express()
const { port } = require('./app/config')

// db
require('./app/db/mongoose')

// fix cors
app.use(cors())

// parse application/json requests
app.use(bodyParser.json()); 

// parse application/x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// basic route
app.get("/", (req, res) => {
  res.json({ message: "Witaj na serwerze." });
});

// routes
const router = require('./app/routes/orders')
app.use('/api/v1/orders', router)

// server
app.listen( port, () => {
    console.log(`Serwer dziala na porcie ${port}`);
})