const express = require('express');
const router = express.Router();
const { database } = require("../db/connection");

/* GET sitters review listing. */
router.get('/', async (req, res) => {
  try {
    const sitterDetail = await database.query(" SELECT sitters.*, reviews.* FROM sitters JOIN reviews ON sitters.id = reviews.sitter_id;");
    res.json(sitterDetail.rows);
  } catch (error) {
    console.error(error)
  }
});



module.exports = router;