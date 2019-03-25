const express = require('express');
const auth = require('../middleware/auth');
const postController = require('../controllers/post');
const router = express.Router();
const app = express();


router.post('/todo', postController.dataPost); 

router.put('/todo/:id', postController.dataUpdate);

router.get('/todo/:id', postController.dataDetails);

router.get('/todo', postController.dataFindAll)

router.delete('/todo/:id', postController.dataDelete); 

module.exports = router;