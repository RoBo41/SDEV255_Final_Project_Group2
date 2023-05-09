const { get, indexOf } = require('lodash');
const Course = require('../models/course');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

// function findIndex(arr, e){
//   for (let i = 0; i < arr.length; i++){
//     if(arr[i].equals(e)){
//       return i;
//     }
//   }
// }

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
    console.log("course id: " + id)
    Course.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedCourse => {
      res.redirect('/courses/' + updatedCourse.id);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const myCourses_get = (req, res)=>{
      res.render('courses/myCourses', { title: 'My Courses'});
  }

  const shoppingCart_get = (req, res)=>{
    res.render('courses/shoppingCart', { title: 'Shopping Cart'});
  }

  const shoppingCart_post = async (req, res) => {
    try {
      const id = req.params.id;
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'net ninja secret');
      const course = await Course.findById(id);
      const user = await User.findById(decodedToken.id);
      user.shoppingCart.push(course);
      user.save()
      .then((result)=>{
        res.json({redirect:'/courses/shoppingCart'})
      })
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
  
  const shoppingCart_delete = async (req,res)=>{
    try{
      const id = req.params.id;
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'net ninja secret');
      const course = await Course.findById(id);
      const user = await User.findById(decodedToken.id);
      console.log(course.courseName);
      //let index = console.log(user.shoppingCart.indexOf(course._id));
      user.shoppingCart.pull(course);
      user.save()
      .then((result)=>{
        res.json({redirect:'/courses/shoppingCart'})
      })
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  const myCourses_post = async(req,res)=>{
    try {
      const id = req.params.id;
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'net ninja secret');
      const course = await Course.findById(id);
      const user = await User.findById(decodedToken.id);
      user.courses.push(course);
      user.shoppingCart.pull(course);
      user.save()
      .then((result)=>{
        res.redirect('/courses/myCourses')
      })
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
  const myCourses_delete = async (req, res) =>{
    try{
      const id = req.params.id;
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'net ninja secret');
      const course = await Course.findById(id);
      const user = await User.findById(decodedToken.id);
      console.log(course.courseName);
      //let index = console.log(user.shoppingCart.indexOf(course._id));
      user.courses.pull(course);
      user.save()
      .then((result)=>{
        res.json({redirect:'/courses/myCourses'})
      })
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  module.exports = {
    course_index,
    course_create_get,
    course_create_post,
    course_delete,
    course_details,
    course_edit,
    shoppingCart_get,
    myCourses_get,
    myCourses_post,
    myCourses_delete,
    shoppingCart_post,
    shoppingCart_delete
  }