const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const app = express();
app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Import Routes module
const sittersRoutes = require('./routes/sitters');
const ownersRoutes = require('./routes/owners');
// const bookingsRoutes = require('./routes/bookings');
const sitterDetailRouter = require('./routes/sittersDetail');
const sitterReviewRouter = require('./routes/sittersReviewListing');
const bookingsRoute = require('./routes/bookings'); 
const loginRoute = require('./routes/login');
const bookingRequestsRoute = require('./routes/bookingRequest');
const petRoute = require('./routes/pets');
const updatebookingRoute = require('./routes/updateRequest');

//Use Routers
//app.use('/', usersRoutes);
//app.use('/bookings', bookingsRoutes);
app.use('/sitters', sitterDetailRouter);
app.use('/sitterreview',sitterReviewRouter);

app.use('/bookings', bookingsRoute); // Use the bookings route
app.use('/api/login', loginRoute); // Use the bookings route
app.use('/bookingrequest', bookingRequestsRoute);
app.use('/pets', petRoute);
app.use('/updatebooking', updatebookingRoute)




app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    },
  })
);


//Use Routes
app.use('/', sittersRoutes);
app.use('/', ownersRoutes);
//app.use('/', bookingsRoutes);






const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});
