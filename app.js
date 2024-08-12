import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const books = [
    {
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Handle GET requests to the home route
app.get("/", (req, res) => {
    res.render('index', { data: books });
});

// Handle POST requests to add a new book
app.post("/", (req, res) => {
    const { bookName, bookAuthor, bookPages, bookPrice } = req.body;

    // Add a new book to the books array
    books.push({
        bookName,
        bookAuthor,
        bookPages: Number(bookPages),  // Convert pages to a number
        bookPrice: Number(bookPrice),  // Convert price to a number
        bookState: "Available"
    });

    // Re-render the index page with the updated book list
    res.render('index', { data: books });
});

// Handle POST requests to issue a book
app.post("/issue", (req, res) => {
    const { bookName } = req.body;

    // Find the book and mark it as issued
    const book = books.find(book => book.bookName === bookName);
    if (book) {
        book.bookState = "Issued";
    }

    // Re-render the index page with the updated book list
    res.render('index', { data: books });
});

// Handle POST requests to return a book
app.post('/return', (req, res) => {
    const { bookName } = req.body;

    // Find the book and mark it as available
    const book = books.find(book => book.bookName === bookName);
    if (book) {
        book.bookState = "Available";
    }

    // Re-render the index page with the updated book list
    res.render("index", { data: books });
});

// Handle POST requests to delete a book
app.post('/delete', (req, res) => {
    const { bookName } = req.body;

    // Find the index of the book and remove it from the array
    const index = books.findIndex(book => book.bookName === bookName);
    if (index !== -1) {
        books.splice(index, 1);
    }

    // Re-render the index page with the updated book list
    res.render("index", { data: books });
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});