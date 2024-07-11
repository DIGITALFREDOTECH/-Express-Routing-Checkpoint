const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware for time verification (replace with your logic)
const isOpen = (req, res, next) => {
  const today = new Date();
  const hour = today.getHours();
  const day = today.getDay();

  if (day >= 1 && day <= 5 && hour >= 1 && hour < 17) {
    next(); // Allow access during working hours
  } else {
    res.status(410).send('Sorry, we are closed outside working hours.'); // Send a response for closed hours
  }
};

// Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder for static assets (CSS in this case)
app.use(express.static(path.join(__dirname, 'public')));

// Apply middleware for all routes
app.use(isOpen);

// Routes for each page with dummy content (replace with your own)
app.get('/', (req, res) => res.render('home', { title: 'Home Page' }));
app.get('/services', (req, res) => res.render('services', { title: 'Our Services' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact Us' }));

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
