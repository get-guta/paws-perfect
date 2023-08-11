const express = require("express");
const router = express.Router();
const { database } = require("../db/connection");
const { getOwners, getOwnerById, updateOwnerById, addOwner } = require("../db/queries/owners");
const { sendNewBookingNotification, getSitters } = require("../helpers");


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
    console.log("REQ", req.body.sub_id);
    const existingOwner = await checkOwner(req.body.sub_id);
    if (existingOwner) {
      throw new Error("Sorry, this pet owner already exists"); 

    }
    const newOwner = await addOwner(req.body);
    res.json({ status: 'SUCCESS', body: newOwner } );
  } catch (error) {
    // console.error(error);
    res.json({status: 'ERROR', body: 'USER EXISTS'});
  }
});

module.exports = router;
