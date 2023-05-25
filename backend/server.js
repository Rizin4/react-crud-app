//Load env variables
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

//Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");
const Book = require("./Models/book")

//Create an express app
const app = express();

//Configure express app
app.use(express.json());

//Connect to database
connectToDb();

//Routing
app.get("/", (req, res) => {
    res.json({ hello: "world" });
});

app.get("/books", async (req, res) => {
    //find the book
    const books = await Book.find();
    //respond with them
    res.json({ books: books });
});

app.post('/books', async (req, res) => {
    //Get the sent in data off request body
    const name = req.body.name;
    const author = req.body.author;

    //Create a book record with it
    const book = await Book.create({
        name: name,
        author: author,
    });
    //Respond with the new book
    res.json({ book: book })

});

//Start our server
app.listen(process.env.PORT); 