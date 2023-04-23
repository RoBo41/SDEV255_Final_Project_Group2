const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000);
app.use(express.static('public'));

app.use((req,res,next)=> {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next()
});


app.get('/', (req, res) => {
    let courses = [];
    res.render('index', { title: 'Home', courses});
  });

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/add-course', (req, res) => {
    res.render('add-course', { title: 'Create a new course'});
} );

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});