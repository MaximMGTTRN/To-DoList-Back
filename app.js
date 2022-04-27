const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const apiRoutes = require("./src/modules/routers/routes");

app.use(cors());

const uri = "mongodb+srv://Max:bushuev123321@cluster0.whymf.mongodb.net/test";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use("/", apiRoutes);

app.listen(8000, () => {
  console.log("8000 port is listening");
});
