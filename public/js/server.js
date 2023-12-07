const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes')
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
// app.use(routes)

// homepage route
app.get("/", (req, res) => {
  res.render("home")
})

// login page route
app.get("/login", (req, res) => {
  res.render("login")
})


// signup page route
app.get("/signup", (req, res) => {
  res.render("signup")
})


app.listen(PORT, () => console.log('Now listening'));