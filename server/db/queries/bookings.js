const { database } = require("../connection");
const { json } = require("express");

// GET all bookings
const getBookings = async () => {
  try {
    const bookings = await database.query("SELECT * FROM bookings");
    console.log(bookings.rows);
    return bookings.rows;
  } catch (error) {
    console.error(error);
  }
};

// // GET booking by sitter id
// const getBookingsBySitterId = async (sitter_id) => {
//   try {
//     const bookingsbySitter = await database.query(
//       `SELECT * FROM bookings WHERE sitter_id = $1;`,
//       [sitter_id]
//     );
//     return bookingsbySitter.rows[0];
//   } catch (error) {
//     console.error(error);
//   }
// };

// GET booking by owner id
const getBookingsByOwnerId = async (owner_id) => {
  try {
    const bookingsbyOwner = await database.query(
      `SELECT * FROM bookings WHERE owner_id = $1;`,
      [owner_id]
    );
    return bookingsbyOwner.rows[0];
  } catch (error) {
    console.error(error);
  }
};

// GET booking by id
const getBookingById = async (id) => {
  try {
    const bookingbyId = await database.query(
      `SELECT * FROM bookings WHERE id = $1;`,
      [id]
    );
    return bookingbyId.rows[0];
  } catch (error) {
    console.error(error);
  }
};

// UPDATE existing booking by id
const updateBookingById = async (id, status) => {
  try {
    const queryString = `UPDATE bookings SET status=$1 WHERE id=$2`;
    const values = [
      status,
      id
    ];
    const updatedBooking = await database.query(queryString, values);
    return updatedBooking.rows[0];
  } catch (error) {
    console.error(error);
  }
};

// UPDATE existing booking by sitter id
const updateBookingBySitterId = async (sitter_id, id) => {
  try {
    const booking = await database.getBookingById(id);
    const queryString = `UPDATE bookings SET start_date=$1, end_date=$2, status=$3, sitter_review=$4, sitter_rating=$5, pet_id=$6, owner_id=$7, siter_id=$8 WHERE id=$9`;
    const values = [
      booking.start_date,
      booking.end_date,
      booking.status,
      booking.sitter_review,
      booking.sitter_rating,
      booking.pet_id,
      booking.owner_id,
      sitter_id,
      id,
    ];
    const updatedBooking = await database.query(queryString, values);
    return updatedBooking.rows[0];
  } catch (error) {
    console.error(error);
  }
};

// UPDATE existing booking by owner id
const updateBookingByOwnerId = async (owner_id, id) => {
  try {
    const booking = await database.getBookingById(id);
    const queryString = `UPDATE bookings SET start_date=$1, end_date=$2, status=$3, sitter_review=$4, sitter_rating=$5, pet_id=$6, owner_id=$7, siter_id=$8 WHERE id=$9`;
    const values = [
      booking.start_date,
      booking.end_date,
      booking.status,
      booking.sitter_review,
      booking.sitter_rating,
      booking.pet_id,
      owner_id,
      booking.sitter_id,
      id,
    ];
    const updatedBooking = await database.query(queryString, values);
    return updatedBooking.rows[0];
  } catch (error) {
    console.error(error);
  }
};

// CREATE new booking
const addBooking = async ({
  start_date,
  end_date,
  status,
  pet_id,
  owner_id,
  sitter_id
}) => {
  console.log(start_date, end_date)
  try {
    const queryString =
      "INSERT INTO bookings (start_date, end_date, status, pet_id, owner_id, sitter_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    
    const values = [start_date, end_date, status, pet_id, owner_id, sitter_id];
    const newBooking = await database.query(queryString, values);
    return newBooking.rows[0];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getBookings,
  getBookingById,
  updateBookingById,
  addBooking,
  getBookingsByOwnerId,
  updateBookingBySitterId,
  updateBookingByOwnerId,
};
