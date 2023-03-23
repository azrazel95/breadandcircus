const router = require('express').Router();
// Include the Book model with the other imports
const { Reader, Book, LibraryCard } = require('../../models');

// GET all readers
router.get('/', async (req, res) => {
  try {
    const readerData = await Reader.findAll({
      // Add Book as a second model to JOIN with
      include: [{ model: LibraryCard }, { model: Book }],
    });
    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }
});
