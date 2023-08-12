const express = require("express");
const router = express.Router();
const { database } = require("../db/connection");
const { addOwner, getOwnerById, updateOwnerById, getOwners, getOwnerBySub_Id } = require("../db/queries/owners");
const { addPet } = require("../db/queries/pets");
const { sendNewBookingNotification, checkOwner, getSitters } = require("../helpers");


/* GET all owners */
router.get("/owners", async (req, res) => {
  try {
    // console.log("All Owners");
    await sendNewBookingNotification();
    const allOwners = await getOwners();
    res.json(allOwners);
  } catch (error) {
    console.log(error.message);
  }
});

/* GET an owner by ID */
router.get("/owners/:id", async (req, res) => {
  try {    
    const selectedOwner = await getOwnerById(req.params.id);
    // console.log(selectedOwner);
    res.json(selectedOwner);
    
  } catch (error) {
    console.error(error)
  }
  
});

/* UPDATE an owner */
router.put("/owners/:id", async(req, res) => {  
  try {  
    let sitter = await updateOwnerById(req.params.id);
    res.json(sitter);
  } catch (error) {

  }
});

/* REGISTER an owner */
router.post("/owners/register", async (req, res) => {
  try {
    //console.log("REQ", req.body);
    const existingOwner = await checkOwner(req.body.sub_id);
    if (existingOwner) {
      throw new Error//("owner already exists"); 

    }
    const newOwner = await addOwner(req.body);
    /* add pet to the pet table */
    //console.log('req.body:',req.body)
    // To query owner table for owner_id where owner.sub_id = req.body.sub_id = 
    const existingOwnerBySub = await getOwnerBySub_Id(req.body.sub_id);
    const pet = {
      name: req.body.pet_name, 
      type: req.body.pet_type, 
      description: req.body.description,
      image_url: req.body.pet_image,
      owner_id: existingOwnerBySub.id
    }
    console.log('pet info:', pet)
    //checkPet
    const newPet = await addPet(pet)
    res.json({ status: 'SUCCESS', body: "Successfully Registered" } );

  } catch (error) {
    console.log('here');
    res.json({status: 'ERROR', body: error.message});
  }
});



module.exports = router;
