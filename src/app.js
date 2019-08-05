const path = require('path')
const express = require('express');
const exphbs = require('express-handlebars');
const {
  popSize
} = require('./views/helpers/helpers')
const countryData = require('../data.json')

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.render("home", {
    title: 'Countries',
    username: "Mavis",
  })
})
app.get('/populations', (req, res) => {
  const data = {
    title: 'Countries',
    username: "Mavis",
    countries: countryData
  }
  res.render("populations", data)
})

app.get('/capitals', (req, res) => {
  const data = {
    title: 'Countries',
    username: "Mavis",
    countries: countryData
  }
  res.render("capitals", data);
})

app.get('/popHelper', (req, res) => {
  res.render("popHelper", {
    title: 'Countries',
    username: "Mavis",
    countries: countryData
  })
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.engine("hbs", exphbs({
  extname: "hbs",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
  defaultLayout: "main",
  helpers: {
    popSize
  }
}));


module.exports = app