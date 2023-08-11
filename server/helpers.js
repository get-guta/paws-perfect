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
    const sitter = await database.query(
      `SELECT first_name, email FROM sitters WHERE id = $1;`,
      [sitter_id]
    );
    return sitter;
  } catch (error) {
    console.error(error);
  }
};

const findOwnerInBooking = async (owner_id) => {
  try {
    const owner = await database.query(
      `SELECT first_name, email FROM owners WHERE id = $1;`,
      [owner_id]
    );
    return owner;
  } catch (error) {
    console.error(error);
  }
};

// when using this function in bookings route, remember to pass the receiver object as a parameter
const sendNewBookingNotification = async (receiver) => {  
  console.log(receiver);
  try {
    //   const receiver = {
    //   name: "Test",
    //   email: "amakuru2023@gmail.com",
    // };

    await sgMail.send({
      from: "Paws perfect <jpniyitanga@gmail.com>",      
      templateId: "d-1684f89a209a4c4da69354a7f68febec",
      personalizations: [
        {
          to: `<${receiver.email}>`,
        },
      ],
      dynamicTemplateData: {
        name: `${receiver.first_name}`,
        subject: "You have a New Booking Request!",
      },
    });
    console.log("Transactional email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

// when using this function in bookings route, remember to pass the receiver object as a parameter
const sendAcceptedBookingNotification = async (receiver) => {  
  console.log(receiver);
  try {
    //   const receiver = {
    //   name: "Test",
    //   email: "amakuru2023@gmail.com",
    // };

    await sgMail.send({
      from: "Paws perfect <jpniyitanga@gmail.com>",      
      templateId: "d-783898feaccf41c4bcbbec2cfa813a34",
      personalizations: [
        {
          to: `<${receiver.email}>`,
        },
      ],
      dynamicTemplateData: {
        name: `${receiver.first_name}`,
        subject: "Your Booking Has Been Accepted!",
      },
    });
    console.log("Transactional email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

// when using this function in bookings route, remember to pass the receiver object as a parameter
const sendCompletedBookingNotification = async (receiver) => {  
  console.log(receiver);
  try {
    //   const receiver = {
    //   name: "Test",
    //   email: "amakuru2023@gmail.com",
    // };

    await sgMail.send({
      from: "Paws perfect <jpniyitanga@gmail.com>",
      templateId: "d-2c4791701c624002a89e8049063e37de",
      personalizations: [
        {
          to: `<${receiver.email}>`,
        },
      ],
      dynamicTemplateData: {
        name: `${receiver.first_name}`,
        subject: "Don't Forget to Leave a Review",
      },
    });
    console.log("Transactional email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

// when using this function in bookings route, remember to pass the receiver object as a parameter
const sendRejectedBookingNotification = async (receiver) => {  
  console.log(receiver);
  try {
    //   const receiver = {
    //   name: "Test",
    //   email: "amakuru2023@gmail.com",
    // };

    await sgMail.send({
      from: "Paws perfect <jpniyitanga@gmail.com>",
      templateId: "d-870d39342e304bf287ebdfb036faa0cf",
      personalizations: [
        {
          to: `<${receiver.email}>`,
        },
      ],
      dynamicTemplateData: {
        name: `${receiver.first_name}`,
        subject: "Ooops, Your Booking Was Not Accepted",
      },
    });
    console.log("Transactional email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

// GET all available sitters by date range
// const searchSittersbyDateRange = async (date_start, date_end) => {
//   try {
//     const startDate = await database.query(
//       `SELECT * FROM sitters WHERE availability_dates @> ARRAY[$1]::date[];`,
//       [date_start]
//     );
//     const endDate = await database.query(
//       `SELECT * FROM sitters WHERE availability_dates @> ARRAY[$1]::date[];`,
//       [date_end]
//     );
//     const availableSitters = await database.query(
//       `SELECT * FROM sitters WHERE availability_days BETWEEN $1 AND $2;`,
//       [startDate, endDate]
//     );
//     if (startDate > endDate) {
//       res.json({message: "Start date should be earlier than end date. Please set your dates correctly!"})
//     }
//     return availableSitters.rows;
//   } catch (error) {
//     console.error(error);
//   }
// };

// GET all available sitters by date range
const searchSittersbyDateRange = async (start_date, end_date) => {
  if (start_date > end_date) {
      res.json({message: "Start date should be earlier than end date. Please set your dates correctly!"})
    }
    // console.log("before calling");
try {
    const availableSitters = await database.query(
      `WITH daterange AS (
    SELECT generate_series($1::date, $2::date, interval '1 day')::date AS specific_date
)
SELECT *
FROM sitters
JOIN daterange ON daterange.specific_date = ANY(sitters.availability_dates)
GROUP BY sitters.id, daterange.specific_date;`,
      [start_date, end_date]
  ); 
  // console.log("available sitters", availableSitters);
  return availableSitters.rows;
} catch (error) {
  console.error(error)
} 

}

// UPDATE existing booking to accepted
const updateBookingtoAccepted = async (id) => {
  try {
    // const selectedBooking = await database.getBookingById(id);
    const queryString = (`UPDATE bookings SET status="accepted WHERE id=$1;`, [id]);
    
    const updatedBooking = await database.query(queryString, values);
    return updatedBooking.rows[0];
  } catch (error) {
    console.error(error);
  }
};

//GET all sitters
const getSitters = async () => {
  try {
    const sitters = await database.query("SELECT * FROM sitters");
    console.log(sitters.rows);
    return sitters.rows;
  } catch (error) {
    console.error(error);
  }
};

//GET a sitter by id
const getSitterById = async (id) => {
  try {
    const selectedSitter = await database.query(
      `SELECT * FROM sitters WHERE id = $1`,
      [id]
    );
    // console.log(selectedSitter.rows[0]);
    return selectedSitter.rows[0];
  } catch (error) {
    console.error(error);
  }
};

//GET sitters accepting cats only
const catSitters = async () => {
  try {
    const sitters = await database.query(
      "SELECT * FROM sitters WHERE accepted_pet_type IN('cat')"
    );
    return sitters.rows;
  } catch (error) {
    console.error(error);
  }
};

//GET sitters accepting dogs only
const dogSitters = async () => {
  try {
    const sitters = await database.query(
      "SELECT * FROM sitters WHERE accepted_pet_type IN('dog')"
    );
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
      userId,
    ];
    const updatedSitter = await database.query(queryString, values);
    return updatedSitter.rows[0];
  } catch (error) {
    console.error(error);
  }
};


// Get booking requests by sitter_id
const getBookingBySitterId = async (sitter_id) => {
  
  return await database
    .query(`SELECT 
    o.first_name || ' ' || o.last_name AS owner_full_name,
    p.name AS pet_name,
    p.description AS pet_description,
    p.type AS pet_type,
    b.id,
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
    b.sitter_id = $1 AND b.status = 'pending' ;
`, [sitter_id])
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => console.log(err.message));
};


const createBooking = async (booking) => {
  //console.log('@ helper', booking.min);

  const query = 
    `INSERT INTO bookings (start_date, end_date, status, pet_id, owner_id, sitter_id)  
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    booking.min,
    booking.max, 
    booking.status,
    booking.pet_id,
    booking.owner_id,
    booking.sitter.sitter_id
  ];
  const result = await database.query(query, values);

  return result.rows[0];
}

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



module.exports = {
  sendNewBookingNotification,
  findOwnerInBooking,
  findSitterInBooking,
  getOwnerByEmail,
  getSitters,
  getSitterById,
  getBookingBySitterId,
  getSitterById,
  // createBooking,
  searchSittersbyDateRange,
  dogSitters,
  catSitters,
  updateBookingById
};
