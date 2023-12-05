const path = require('path');
const express = require('express');
const dayjs = require('dayjs')
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;


// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// homepage route
app.get("/", (req, res) => {
  res.render("home")
})

// login page route
app.get("/login", (req, res) => {
  res.render("login")
})


// profile page route
app.get("/profile", (req, res) => {
  res.render("profile")
})


app.listen(PORT, () => console.log('Now listening'));