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
app.get('/books', async (req, res) => {
    let dbResponse = await Book.find();
    res.send(dbResponse);
})

// .findOne()
app.get('/books/:title', async (req, res) => {
    let title = req.params.title;
    let dbResponse = await Book.findOne({title: title});
    res.send(dbResponse);
})
 
// findById
app.get('/books/:id', async (req, res) => {
    let id = req.params.id;
    let dbResponse = await Book.findById(id);
    res.send(dbResponse);
})


// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

// filter
app.get('/books/filter/:pages', async (req, res) => {
    let pages = req.params.pages;
    let dbResponse = await Book.find({pages: {$gte: pages}});
    res.send(dbResponse);
})

//.findByIdAndDelete()
app.delete('/books/:id', async (req, res) => {
    let id = req.params.id;
    let dbResponse = await Book.findByIdAndDelete(id);
    res.send(dbResponse);
})  

// .deleteMany()
app.delete('/books', async (req, res) => {
    let dbResponse = await Book.deleteMany();
    res.send(dbResponse);
})  

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


