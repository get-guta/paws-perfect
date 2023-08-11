const express = require('express');
const router = express.Router();
const { database } = require("../db/connection");
const {getPetsByOwnerId} = require('../db/queries/pets');



/* GET all pets by owner id */
router.get('/:id', async (req, res) => {
  try {
    const pets = await getPetsByOwnerId(req.params.id);
    res.json(pets);    
  } catch (error) {
    console.log(error.message);
  }  
});

module.exports = router;