import React, { useState, useEffect } from 'react';

function SearchSitters() {


  return (

    <div class="h-100 p-5 bg-light border rounded-3 col-md-6">

      <fieldset class="mb-3 d-flex flex-row justify-content-center align-items-center alert alert-secondary">
        <div>
          <h6>I am looking for service for my: &nbsp;</h6>
        </div>

        <div class="form-check">
          <input type="radio" name="radios" class="form-check-input" id="exampleRadio1"></input>
          <label class="form-check-label" for="exampleRadio1">Dog</label>
        </div>

        <div><p>&nbsp;&nbsp;</p></div>

        <div class="form-check">
          <input type="radio" name="radios" class="form-check-input" id="exampleRadio2"></input>
          <label class="form-check-label" for="exampleRadio2">Cat</label>
        </div>

      </fieldset>

      <div class="bd-example d-flex justify-content-around">

        <button type="button" class="btn btn-outline-secondary flex-column">
          <span class="material-symbols-outlined">house</span>
          <br></br>
          House Sitting
        </button>

        <button type="button" class="btn btn-outline-secondary flex-column">
          <span class="material-symbols-outlined">pet_supplies</span>
          <br></br>
          Dog Walking
        </button>

        <button type="button" class="btn btn-outline-secondary flex-column">
          <span class="material-symbols-outlined">pin_drop</span>
          <br></br>
          Drop-in Visits
        </button>

      </div>

      <br></br>

      <div class="d-flex flex-row  mb-3 justify-content-around">

        <div class="mb-3">
          <label for="exampleInputStartDate" class="form-label">Start date</label>
          <input type="date" class="form-control" id="exampleInputStartDate" aria-describedby="dateHelp" />
        </div>

        <div class="mb-3">
          <label for="exampleInputEndDate" class="form-label">End date</label>
          <input type="date" class="form-control" id="exampleInputEndDate" aria-describedby="dateHelp" />
        </div>

      </div>

      <div class="d-flex flex-column">
        <button class="btn btn-secondary justify-content-around" type="button">Search</button>
      </div>

    </div>

  )
}
export default SearchSitters;