'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const { mongoose } = require('mongoose');
require('dotenv').config(); // Load environment variables

const uri = process.env.MONGO_URI; // MongoDB connection string

// Database setup
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB Connected'));

// Routers
const indexRouter = require('./routers/indexRouter');
const projectRouter = require('./routers/projectRouter');

const PORT = process.env.PORT || 3000;
const app = express();

// Allow cross-origin requests from localhost
app.use(cors({ origin: [/127.0.0.1*/, /localhost*/] }));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up for Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ViewData for Global Navigationx
const viewData = {
  title: 'My Portfolio',
  pages: [
    { path: '/', name: 'Home' },
    { path: '/projects', name: 'Projects' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
  ],
};

// Static Pug Demo
app.use((req, res, next) => {
  res.locals.viewData = viewData;
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/projects', projectRouter);

// Handle 404 errors
app.all('/*', (req, res) => {
  res.status(404).send('File Not Found');
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
