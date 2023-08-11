const express = require('express');
const router = express.Router();
const { database } = require("../db/connection");
const { addSitter, getSitterById, updateSitterById, getSitters } = require('../db/queries/sitters');
const {getBookingBySitterId, checkSitter} = require('../helpers');


/* GET all sitters */
router.get('/sitters', async (req, res) => {
  try {
    const allSitters = await getSitters();
    res.json(allSitters);    
  } catch (error) {
    console.log(error.message);
  }  
});

/* GET a sitter by ID */
router.get("/sitters/:id", async (req, res) => {
  try {    
    const selectedSitter = await getSitterById(req.params.id);
    res.json(selectedSitter);
    
  } catch (error) {
    console.error(error)
  }
  
});

/* UPDATE a sitter */
router.put("/sitters/:id", async(req, res) => {  
  try {  
    let sitter = await updateSitterById(req.params.id);
    res.json(sitter);
  } catch (error) {

  }
});

/* REGISTER a sitter */
router.post("/sitters/register", async (req, res) => {
  try {
    //console.log("REQ", req.body.sub_id);
    const existingSitter = await checkSitter(req.body.sub_id);
    if (existingSitter) {
      throw new Error("Sorry, this pet sitter already exists"); 

    }
    const newSitter = await addSitter(req.body);
    res.json({ status: 'SUCCESS', body: newSitter } );

  } catch (error) {
    // console.error(error);
    res.json({status: 'ERROR', body: 'USER EXISTS'});
  }
});


// Sitters Booking request
router.get("/sitterbookings/:id", async (req, res) => {
  try {
    const newBookingRequests = await getBookingBySitterId(req.params.id);
    res.json(newBookingRequests);
  } catch (error) {
    console.error(error);
  }
});



module.exports = router;
