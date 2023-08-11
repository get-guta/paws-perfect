const express = require("express");
const router = express.Router();
const { database } = require("../db/connection");
const {createBooking} =require('../helpers');





/* POST a booking */
router.post('/', async (req, res) => {
  try {

    const newBooking = req.body;
    const booking = await createBooking(newBooking);

    res.status(201).json({
      message: 'Booking Request successfully sent',
      booking
    });


  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  
  }
});




module.exports = router;
