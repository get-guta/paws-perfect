const express = require("express");
const router = express.Router();
const { database } = require("../db/connection");
const {createBooking, sendNewBookingNotification, findSitterInBooking} =require('../helpers');


/* POST a booking */
router.post('/', async (req, res) => {
  try {

    const newBooking = req.body;
    console.log("newBooking", newBooking);
    const booking = await createBooking(newBooking);

    res.status(201).json({
      message: 'Booking Request successfully sent',
      booking
    });
    const sitter = await findSitterInBooking(booking.sitter_id); 
    // console.log("Sitter: ", sitter)
    await sendNewBookingNotification(sitter);


  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  
  }
});




module.exports = router;
