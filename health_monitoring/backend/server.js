const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const parser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

const transactionRoute = require("./routes/devicetransaction");
app.use("/devicetransaction", transactionRoute);

const siteroute = require("./routes/site");
app.use("/site", siteroute);

const bullshit = require("./routes/aggregation");
app.use("/aggregation", bullshit);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server  is running  on port: ${port}`);
});
