const express = require('express');

const authorsController = require("../controllers/authors.controller");
const router = express.Router();

router.get('/', authorsController.getAuthors);
router.post('/', authorsController.createAuthors);
router.put('/', authorsController.updateAuthors);
router.delete('/', authorsController.deleteAuthors);

module.exports = router;