const express = require("express");
const router = express.Router();
const { database } = require("../db/connection");
const { getBookings, updateBookingById, getBookingById,  } = require('../db/queries/bookings');
const {
  sendNewBookingNotification,
  findSitterInBooking,
  chatWithOwner,
  createBooking
} = require("../helpers");


/* GET bookings listing. */
router.get("/", async (req, res) => {
  try {
    const allBookings = await getBookings();
    res.json(allBookings);
  } catch (error) {
    console.error(error);
  }
});

/* GET booking by id. */
router.get("/:id", async (req, res) => {
  try {
    const selectedBooking = await getBookingById(req.params.id);
    res.json(selectedBooking);
  } catch (error) {
    console.error(error);
  }
});



/* UPDATE booking by id. */

/* POST a booking */
router.post('/bookings', async (req, res) => {
  
  try {
    const newBooking = await createBooking(req, body);
    // res.json(newBooking);
    // console.log(newBooking, "Hello")
    const sitter = await findSitterInBooking(newBooking.sitter_id)
    await sendNewBookingNotification(sitter.rows[0]);
    res.json({message: "Email sent!"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  
  }
});

/* Message owner through Sendgrid */
router.post('/send', async (req, res) => {
  try {
    
    console.log("Request", req.body)

    const response = await chatWithOwner(req.body)   
    console.log("response", response)
    res.json({message: "Email sent!"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  
  }
});

module.exports = router;
