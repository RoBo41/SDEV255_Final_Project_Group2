const Course = require('../models/course')

const course_index = (req, res)=>{
    Course.find().sort({ createdAt: -1})
    .then((result)=>{
      res.render('courses/index', { title: 'Courses', courses: result});
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
   const course_create_post = (req,res)=>{
    const course = new Course(req.body)
    course.save()
      .then((result)=>{
        res.redirect('/')
      })
      .catch((err)=>{
        console.log(err)
      })  
    }
  
  const course_create_get = (req, res) => {
    res.render('courses/create', { title: 'Create a new course'});
  }
  
  const course_details = (req, res) => {
    const id = req.params.id;
      Course.findById(id)
      .then(result => {
        res.render('courses/details', { course: result, title: 'Course Details' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const course_delete = (req, res) => {
    const id = req.params.id;
      
    Course.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const course_edit = (req, res) => {
    const id = req.params.id;
    //const { courseName, subjectArea, creditHours, description } = 
    console.log(req.body);
    Course.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedCourse => {
      res.redirect('/courses/' + updatedCourse.id);
    })
    .catch(err => {
      console.log(err);
    });
  }

  module.exports = {
    course_index,
    course_create_get,
    course_create_post,
    course_delete,
    course_details,
    course_edit
  }