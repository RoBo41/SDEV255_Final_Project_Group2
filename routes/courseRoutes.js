const express = require('express')
const router = express.Router();
const courseController = require('../controllers/courseController');
const {requireAuth, requireTeacherAuth, requireStudentAuth} = require('../middleware/authMiddleware');
const {checkShoppingCartForCourse, checkCoursesForCourse} = require('../middleware/courseMiddleware');

router.get('/', requireAuth, courseController.course_index)
  
router.post('/', requireTeacherAuth, courseController.course_create_post);
  
router.get('/create', requireTeacherAuth, courseController.course_create_get);

router.get('/myCourses', requireAuth, courseController.myCourses_get);

router.get('/shoppingCart', requireStudentAuth, courseController.shoppingCart_get);

router.post('/shoppingCart/:id', requireStudentAuth, checkShoppingCartForCourse, checkCoursesForCourse, courseController.shoppingCart_post);

router.delete('/shoppingCart/:id', requireStudentAuth, courseController.shoppingCart_delete);

router.post('/myCourses/:id', requireAuth, checkCoursesForCourse, courseController.myCourses_post);

router.delete('/myCourses/:id', courseController.myCourses_delete);

//The following  must be at bottom of the script
router.get('/:id', requireAuth, courseController.course_details);

router.delete('/:id', requireTeacherAuth, courseController.course_delete);

router.post('/:id', requireTeacherAuth, courseController.course_edit);



module.exports = router;