const express = require("express");
const router = express.Router();
const { database } = require("../db/connection");
const  {updateBookingById} =require('../helpers');



/* UPDATE booking by id. */

router.post("/", async (req, res) => {
  console.log("in updateRequest", req.body);
  try {
    const id = req.body.reqid;
    const status = req.body.status;
    const updatedBooking = await updateBookingById(id, status);
    
    res.json(updatedBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while updating the booking." });
  }
});

module.exports = router;