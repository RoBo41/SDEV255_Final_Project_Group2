const express = require('express')
const router = express.Router();
const courseController = require('../controllers/courseController');
const {requireAuth} = require('../middleware/authMiddleware');

router.get('/', requireAuth, courseController.course_index)
  
router.post('/', requireAuth, courseController.course_create_post);
  
router.get('/create', requireAuth, courseController.course_create_get);
  
router.get('/:id', requireAuth, courseController.course_details);
  
router.delete('/:id', requireAuth, courseController.course_delete);

router.post('/:id', requireAuth, courseController.course_edit);

module.exports = router;