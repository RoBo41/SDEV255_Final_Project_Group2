const express = require('express');
const mongoose = require('mongoose');
const Course = require('./models/course');
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

// app.get('/add-course', (req, res) => {
//     res.render('add-course', { title: 'Create a new course'});
// } );

app.get('/courses', (req, res)=>{
  Course.find().sort({ createdAt: -1})
  .then((result)=>{
    res.render('index', { title: 'Courses', courses: result});
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.post('/courses', (req,res)=>{
  const course = new Course(req.body)
  course.save()
    .then((result)=>{
      res.redirect('/courses')
    })
    .catch((err)=>{
      console.log(err)
    })  
  });

app.get('/courses/create', (req, res) => {
  res.render('create', { title: 'Create a new course'});
} );

app.get('/courses/:id', (req, res) => {
  const id = req.params.id;
    Course.findById(id)
    .then(result => {
      res.render('details', { course: result, title: 'Course Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/courses/:id', (req, res) => {
  const id = req.params.id;
    
  Course.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});