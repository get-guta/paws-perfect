import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SitterDetailCss.css';
import StarRating from '../components/StartRating';



function SitterDetailsForm(props) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPet, setselectedPet] = useState(1);
  //console.log("props", props);

  const handleBookRequest = async () => {
    console.log("under handleBookRequest ", props);


    const { sitter, min, max, owner_id, petsData } = props;
    // console.log("petsData detail", petsData.id)
    // console.log("sitterDetails ", sitter)

    const newBooking = {
      pet_id: selectedPet,
      owner_id: owner_id,
      sitter: sitter,
      status: "pending",
      min: min,
      max: max
    };
   

    // console.log("new booking", newBooking); 

    try {
      await axios.post('http://localhost:8080/bookingrequest', newBooking);
      setSent(true);
      console.log('Booking request sent successfully');
      props.setReset(false);

    } catch (error) {
      console.error('Error sending booking request:', error);
      setError(true);
      props.setReset(false);
    }
  };
  const handleOptionChange = (event) => {
    setselectedPet(event.target.value);
  };
  const showSitterDetails = () => {
    if (props.reset) {
      return (
        
        <div>
          <h2>Sitter Details</h2>
          <div className="sitter-details-form">
            <div className="circular-image"> <img src={props.sitter.photo_url} alt="Sitter" /> </div>
            <p className="sitter-name">{props.sitter.first_name} {props.sitter.last_name}</p>
            <p>Pet Types: {props.sitter.accepted_pet_type.join(' | ')}</p>
            <h5>Reviews</h5>
            <p> {props.sitter.sitter_review}</p>
            <p><StarRating rating={props.sitter.sitter_rating} /></p>
            <>
            <label>Select your Pet</label>
            <select id="dropdown" value={selectedPet} onChange={handleOptionChange}>
              {props.petsData.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            </>

            <button type="button" onClick={handleBookRequest}>Book Sitting Request</button>
          </div>
        </div>
      );
    } else {
      if (error) {

        return (
          <div>
            <h2>Oops!</h2>
            <p>Unable to send request to {props.sitter.first_name}. Please contact Admin!</p>
          </div>
        );

      }
      if (sent) {
        return (
          <div>
            <h2>Success!</h2>
            <p>Request successfully sent for {props.sitter.first_name}.</p>
          </div>
        );
      }

    }

  };
  return (
    <div>
      {showSitterDetails()}
    </div>
  );
}

export default SitterDetailsForm;
