const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes')
//express app
const app = express();

const dbURI = 'mongodb+srv://Group2User:Group2Password@nodetut.cuis5bu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=> app.listen(3000))
  .catch((err)=> console.log(err));

//register view engine
app.set('view engine', 'ejs')

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


//Standard Routes
app.get('/', (req, res) => {
    res.redirect('/courses')
  });

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

// course routes
app.use('/courses', courseRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});