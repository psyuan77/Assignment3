const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/search', projectController.SearchProjects);
router.get('/', projectController.Projects);
router.get('/:id', projectController.Project);

module.exports = router;
