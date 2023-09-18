# Paws-Perfect Pet Sitting App

Paws-Perfect is a web application built using the PERN (PostgreSQL, Express.js, React.js, Node.js) stack, designed to facilitate pet owners in finding reliable pet sitters for their beloved animals. It enables pet owners to schedule pet sitting appointments, review pet sitters' ratings, and allows pet sitters to manage their availability and confirm booking requests.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

Paws-Perfect offers the following key features:

- **User Authentication:** Pet owners and pet sitters can register, log in, and manage their profiles.

- **Pet Sitting Booking:** Pet owners can select a date and review pet sitters' ratings before scheduling a pet sitting appointment with their preferred pet sitter.

- **Availability Management:** Pet sitters can manage their availability, making it easy for pet owners to see when they are available for bookings.

- **Booking Confirmation:** Pet sitters have the option to confirm or decline booking requests based on their availability and the provided pet information.

## Getting Started

### Prerequisites

Before you start, make sure you have the following prerequisites:

- Node.js and npm (Node Package Manager) installed on your system.

- PostgreSQL database server installed and running.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/get-guta/paws-perfect.git

2. Navigate to the project directory:

  ```bash
  cd paws-perfect

3. Install server dependencies:

  ```bash
  cd server
  npm install

4. Install client dependencies:

  ```bash
  cd ../client
  npm install 

5. Start the server:

  ```bash
  cd ../server
  npm start

6. Start the client:

  ```bash
  cd ../client
  npm start

Your Paws-Perfect app should now be running. You can access it at http://localhost:3000.

## Usage

- Register as a new user or log in with your existing account.

### As a Pet Owner, you can:

- Browse pet sitters' profiles, including their ratings.
- Select a date for pet sitting.
- Review pet sitters' ratings and reviews.
- Schedule a pet sitting appointment with a pet sitter.

### As a Pet Sitter, you can:

- Manage your availability on your profile.
- Receive booking requests from pet owners.
- Confirm or decline booking requests based on your availability and the provided pet information.

## Project Structure

- `/client`: Frontend React application.
- `/server`: Backend Express.js application.
- `/server/db`: Database schema and migrations using PostgreSQL.
- `/server/routes`: API routes for user authentication, profiles, bookings, and availability.

## Technologies Used

**Frontend:**

- React.js
- React Router
- Axios for API requests
- Bootstrap for styling

**Backend:**

- Node.js
- Express.js
- PostgreSQL


## Contributing

We welcome contributions to Paws-Perfect. Please feel free to fork the repository, make improvements, and submit pull requests. Make sure to follow our code of conduct.



