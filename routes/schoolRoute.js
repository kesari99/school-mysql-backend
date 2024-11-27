const router = require('express').Router(); 

const schoolRoute = require('../controllers/schoolController');

router.post('/addSchool', schoolRoute.addSchool);

router.get('/getSchools', schoolRoute.getSchools);

module.exports = router;