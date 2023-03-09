const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dbconfig = require("./config/db");


app.use(cors());
app.use(express.json());

// // Connect to database
// dbconfig();
// Routes
app.use("/api/auth", require("./routes/AuthRoutes"));
// app.use("/api/scouter", require("./routes/ScouterRoutes"));



// listen to port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);

module.exports = app;