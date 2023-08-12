const { database } = require("../connection");
const { json } = require("express");

//Get all owners
const getOwners = async () => {
  try {
    const owners = await database.query("SELECT * FROM owners");
    return owners.rows;
  } catch (error) {
    console.error(error);
  }
};

//Get owner by id
const getOwnerById = async (id) => {
  try {
    const selectedOwner = await database.query(
      `SELECT * FROM owners WHERE id = $1`,
      [id]
    );
    return selectedOwner.rows[0];
  } catch (error) {
    console.error(error);
  }
};

//Get owner id by sub_id
const getOwnerBySub_Id = async (sub_id) => {
  try {
    const selectedOwner = await database.query(
      `SELECT id FROM owners WHERE sub_id = $1`,
      [sub_id]
    );
    return selectedOwner.rows[0];
  } catch (error) {
    console.error(error);
  }
};

//Get owner by email
const getOwnerByEmail = async (email) => {
  try {
    const selectedOwner = await database.query(
      `SELECT * FROM owners WHERE email = $1`, [email]);
    return selectedOwner;
  } catch (error) {
    console.error(error);
  }
};

// Update existing owner
const updateOwnerById = async (id) => {
  try {
    const owner = await database.getOwnerById(id);
    const queryString = `UPDATE owners SET first_name=$1, last_name=$2, email=$3, sub_id=$4, photo_url=$5 WHERE id=$6`;
    const values = [
      owner.first_name,
      owner.last_name,
      owner.email,
      owner.sub_id,
      owner.photo_url,
      id,
    ];
    const updatedOwner = await database.query(queryString, values);
    return updatedOwner.rows[0];
  } catch (error) {
    console.error(error);
  }
};

//Need to confirm which input we get from user
// Register new owner
// const addOwner = async (first_name, last_name, email, sub_id, photo_url) => {
//   try {
//     const query =
//       "INSERT INTO owners (first_name, last_name, email, sub_id, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
//     const values = [first_name, last_name, email, sub_id, photo_url];
//     const newOwner = await database.query(query, values);
//     return json(newOwner);
//   } catch (error) {
//     console.error(error);
//   }
// };

// CREATE a new Owner
const addOwner = async ({
  first_name,
  last_name,
  photo_url,
  email,
  sub_id,
  //accepted_pet_type
  //availability_dates
}) => {
  try {
    const query =
      "INSERT INTO owners (first_name, last_name, photo_url, email, sub_id) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      first_name,
      last_name,
      photo_url,
      email,
      sub_id
    ];
    const newOwner = await database.query(query, values);
    return json(newOwner);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addOwner, getOwners, getOwnerById, updateOwnerById, getOwnerByEmail, getOwnerBySub_Id };
