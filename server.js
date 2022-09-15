const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv').config();
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API." });
});

const db = require("./models/index");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./routes/user.routes")(app);
require("./routes/ticket.routes")(app);
require("./routes/cart.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});