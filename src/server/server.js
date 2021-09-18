const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// localhost:3000/ delivers the string "hello world"
app.get("/", (req, res) => res.send("Hello World!"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.once("open", () => console.log("db connected."));

let listItemSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});
const ListItem = mongoose.model("ListItem", listItemSchema);

// CRUD Operations
app.post("/listitem", async (req, res) => {
  try {
    let listItem = new ListItem(req.body);
    let result = await listItem.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/shopping_list", async (req, res) => {
  try {
    let result = await ListItem.find().exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/listitem/:id", async (req, res) => {
  try {
    let result = await ListItem.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start Server at Port 3000
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
