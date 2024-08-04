const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const notesRouter = require("./routes/noteRouter.js");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/notes", notesRouter);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://farel:yhrdqVHM9irq5jYD@cluster0.mzhr4vm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
