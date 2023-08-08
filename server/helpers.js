const { Pool } = require("pg");
const { database } = require("./db/connection");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Get owners by email
const getOwnerByEmail = async function (email) {
  return await database
    .query(`SELECT * FROM owners WHERE email = $1`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error(error);
    });
};

const findSitterInBooking = async (sitter_id) => {
  try {
    const sitter = await database
      .query(`SELECT first_name, email FROM sitters WHERE id = $1;`, [sitter_id])
      return res.rows[0];    
  } catch (error) {
    console.error(error)
  }
};

const findOwnerInBooking = async (owner_id) => {
  try {
    const owner = await database.query(
      `SELECT first_name, email FROM owners WHERE id = $1;`,[owner_id]);
    return res.rows[0];
  } catch (error) {
    console.error(error);
  }
};

// when using this function in bookings route, remember to pass the receiver object as a parameter
const sendNewBookingNotification = async (receiver) => {
  // const { email, message } = data;
  // const emailData = {
  //   from: "jpniyitanga@gmail.com", // Replace with your email address (sender)
  //   to: "nijepi@yahoo.fr",
  //   subject: "Notification: You have a New Booking Request",
  //   text: "Hello there",
  // };  
  try {
      const receiver = {
      name: "John",
      email: "jpniyitanga@gmail.com",
    };

    await sgMail.send({
      from: "Paws perfect <jpniyitanga@gmail.com>",
      // to: receiver.email,
      // subject: "You have a New Booking Request!",
      // html: `Hello there ${receiver.name}, You have a new booking request! Please log into your account for more information!`,
      // text: `Hello there ${receiver.name}, You have a new booking request! Please log into your account for more information! `,
      templateId: "d-1684f89a209a4c4da69354a7f68febec",
      personalizations: [
        {
          to: `<${receiver.email}>`,
        },
      ],
      dynamicTemplateData: {
        name: `${receiver.name}`,
        subject: "You have a New Booking Request!",
      },
    });
    console.log("Transactional email sent successfully");
  } catch (error) {
      console.log(error.message.body.errors);
    }     
};

// GET all available sitters by date range
const searchSittersbyDateRange = async () => {
  try {
    const startDate = await database.query(
      `SELECT MIN($1) AS start_date
FROM (
  SELECT UNNEST(availability_days) AS date_element
  FROM sitters 
) subquery;`,
      [date_element]
    );

    const endDate = await database.query(
      `SELECT MAX(data_element) AS end_date
FROM (
  SELECT UNNEST(availability_days) AS date_element
  FROM sitters 
) subquery;`,
      [date_element]
    );
    const availableSitters = await database.query(
      `SELECT * FROM sitters WHERE availability_days BETWEEN $1 AND $2`,
      [startDate, endDate]
    );
    return availableSitters.rows;
  } catch (error) {
    console.error(error)
  }
};

//GET all sitters
const getSitters = async () => {
  try {
    const sitters = await database.query("SELECT * FROM sitters");
    console.log(sitters.rows)
    return sitters.rows;
  } catch (error) {
    console.error(error);
  }
};

//GET a sitter by id
const getSitterById = async (id) => {
  try {
    const selectedSitter = await database.query(
      `SELECT * FROM sitters WHERE id = $1`, [id]);
    // console.log(selectedSitter.rows[0]);
    return selectedSitter.rows[0];
  } catch (error) {
    console.error(error);
  }
};

//GET sitters accepting cats only
const catSitters = async () => {
  try {
    const sitters = await database.query("SELECT * FROM sitters WHERE accepted_pet_type IN('cat')");
    return sitters.rows;
  } catch (error) {
    console.error(error);
  }
};

//GET sitters accepting dogs only
const dogSitters = async () => {
  try {
    const sitters = await database.query("SELECT * FROM sitters WHERE accepted_pet_type IN('dog')");
    return sitters.rows;
  } catch (error) {
    console.error(error);
  }
};


// UPDATE existing sitter
const updateSitterById = async (userId) => {
  try {
    const sitter = await database.getSitterById(userId);
    const queryString = `UPDATE sitters SET first_name=$1, last_name=$2, photo_url=$3, email=$4, sub_id=$5, accepted_pet_type=$6, availability_dates=$7 WHERE id=$8`;
    const values = [
      sitter.first_name,
      user.last_name,
      sitter.photo_url,
      sitter.email,
      sitter.sub_id,
      sitter.accepted_pet_type,
      sitter.availability_dates,
      userId
    ];
    const updatedSitter = await database.query(queryString, values);
    return updatedSitter.rows[0];
  } catch (error) {
    console.error(error);
  }
};

//Need to confirm how to get input from user/form
// CREATE a new sitter
const addSitter = async ({
  first_name,
  last_name,
  photo_url,
  email,
  sub_id,
  accepted_pet_type,
  availability_dates
}) => {
  try {
    const query =
      "INSERT INTO sitters (first_name, last_name, photo_url, email, sub_id, accepted_pet_type, availability_dates) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const values = [
      first_name,
      last_name,
      photo_url,
      email,
      sub_id,
      accepted_pet_type,
      availability_dates,
    ];
    const newSitter = await database.query(query, values);
    return json(newSitter);
  } catch (error) {
    console.error(error);
  }
};

const getBookingBySitterId = async (sitter_id) => {

  return await database
    .query(`SELECT 
    o.first_name || ' ' || o.last_name AS owner_full_name,
    p.name AS pet_name,
    p.description AS pet_description,
    p.type AS pet_type,
    b.start_date AS booking_start_date,
    b.end_date AS booking_end_date,
    b.status
FROM 
    bookings b
JOIN 
    pets p ON b.pet_id = p.id
JOIN 
    owners o ON b.owner_id = o.id
WHERE 
    b.sitter_id = $1 AND b.status = 'pending' ;`
, [sitter_id])
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => console.log(err.message));
};

const createBooking = async (booking) => {
  console.log('@ helper', booking.min);

  const query = 
    `INSERT INTO bookings (start_date, end_date, status, pet_id, owner_id, sitter_id)  
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`
  ;

  const values = [
    booking.min,
    booking.max, 
    booking.status,
    booking.sitter.pet_id,
    booking.sitter.owner_id,
    booking.sitter.sitter_id
  ];
  const result = await database.query(query, values);

  return result.rows[0];
}

module.exports = {
  sendNewBookingNotification,
  findOwnerInBooking,
  findSitterInBooking,  
  getOwnerByEmail,
  getSitters,
  getSitterById,
  getBookingBySitterId,
  getSitterById,
  createBooking,
  searchSittersbyDateRange,
  dogSitters,
  catSitters
};
