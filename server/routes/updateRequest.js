
const express = require("express");
const router = express.Router();
const { database } = require("../db/connection");
const { updateBookingById, sendAcceptedBookingNotification, findOwnerInBooking, sendRejectedBookingNotification } = require('../helpers');




/* UPDATE booking by id. */

router.post("/", async (req, res) => {
  try {
    const id = req.body.reqid;
    const status = req.body.status;
    const updatedBooking = await updateBookingById(id, status);
    const owner = await findOwnerInBooking(updatedBooking.owner_id);
    console.log(owner)
    if (status === 'accepted') {
      await sendAcceptedBookingNotification(owner);
    }
    if (status === 'rejected') {
      await sendRejectedBookingNotification(owner);
    }
    res.json({ 'count': updatedBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while updating the booking." });
  }
});

module.exports = router;