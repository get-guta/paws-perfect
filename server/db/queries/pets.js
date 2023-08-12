const { database } = require("../connection");
const { json } = require("express");

// Get pet by owner id
const getPetsByOwnerId = async (owner_id) => {
try {
  const pets = await database.query(`SELECT * FROM pets WHERE owner_id = $1;`, [owner_id]);
  return pets.rows;
} catch (error) {
  console.error(error);
}

};

// Add a pet 
const addPet = async ({
  name,
  type,
  description,
  image_url,
  owner_id
}) => {
  try {
    const query =
      "INSERT INTO pets (name, type, description, image_url, owner_id) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      name,
      type,
      description,
      image_url,
      owner_id
    ];
    const newPet = await database.query(query, values);
    return json(newPet);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {getPetsByOwnerId, addPet};
