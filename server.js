const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //


// find   - finds everything
// .find()
 
// findById

// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

// findOne

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


