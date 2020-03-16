const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampWithinRadius
} = require('../controllers/bootcamps');

// Include oher resource routers
const courseRouter = require('./courses');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootcampWithinRadius);

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
