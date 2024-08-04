const express = require("express");
const router = express.Router();
const Note = require("../models/Note.js");

// Create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = new Note({
      title,
      content,
      category,
    });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a note by ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a note by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, category, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a note by ID
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
