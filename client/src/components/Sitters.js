import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faComment, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../css/bookingRequestCss.css';
import Navbar from "./Navbar";
import axios from 'axios';
import dateFormater from '../util';

function Sitters() { // it will replaced by session information
  const sitter_id = 1; // props.sitter_id
  const [bookingRequests, setBookingRequests] = useState([]);


  useEffect(() => {

    fetch(`http://localhost:8080/sitterbookings/${sitter_id}`)
      .then((response) => response.json())
      .then((data) => {
        setBookingRequests(data);
      })
      .catch((error) => console.error(error));
  }, []);


  const handleAccept = async (request) => {

    // Implement your accept logic here
   

    try {
      await axios.post('http://localhost:8080/updatebooking', {'reqid':request, 'status': 'accepted'});
      
      console.log('Booking status updated successfully');
      window.location.reload();

     
    } catch (error) {
      console.error('Error updating booking status:', error);
    
    }

    console.log('Accepted:', request);
  };


  const handleChat = async (request) => {
    // Implement your chat logic here

    
    console.log('Chat with owner:', request);
  };

  const handleReject = async (request) => {
    // Implement your reject logic here
 

    try {
      await axios.post('http://localhost:8080/updatebooking', {'reqid':request, 'status': 'rejected'});
      
      console.log('Booking status updated successfully');
      window.location.reload();
     
    } catch (error) {
      console.error('Error updating booking status:', error);
    
    }
    
    console.log('Rejected:', request);
  };

  return (

    <>
      <Navbar />

      <ul className="list-group pet-requests-list">
        {bookingRequests.map((request, index) => (
          <li key={index} className="list-group-item pet-request-item">
            <p>Owner: {request.owner_full_name}</p>
            <p>Pet Type: {request.pet_type}</p>
            <p>Description: {request.pet_description}</p>
            <p> Start Date: {dateFormater(request.booking_start_date)}</p>
            <p> End Date: {dateFormater(request.booking_end_date)}</p>



            <div className="action-buttons">
              <button type="button" className="btn btn-success mr-2" onClick={() => handleAccept(request.id)}>
                <FontAwesomeIcon icon={faCheck} /> Accept
              </button>
              <button type="button" className="btn btn-primary mr-2" onClick={() => handleChat(request)}>
                <FontAwesomeIcon icon={faComment} /> Chat with Owner
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleReject(request.id)}>
                <FontAwesomeIcon icon={faTimes} /> Reject
              </button>
            </div>
          </li>
        ))}
      </ul>



      {/* <div>
        <ul>
          {sitters.map((sitter, key) => (
            <li key={sitter.id}>
              {sitter.first_name} {sitter.last_name}
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
}

export default Sitters;
