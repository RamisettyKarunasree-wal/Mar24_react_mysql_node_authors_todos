const express = require('express');
const authorsController = require('../controllers/authors');
const router = express.Router();
router.get('/createTable', authorsController.createAuthorsTable);
router.get('/', authorsController.getAuthors);
router.post('/', authorsController.postAuthors);
router.delete('/:id', authorsController.deleteAuthors);
router.put('/:id', authorsController.updateAuthors);
module.exports = router;
