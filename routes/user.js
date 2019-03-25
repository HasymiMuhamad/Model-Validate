const userController = require('../controllers/user');
const express = require('express');
const apps = express(); 
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth')



router.get('/test',  userController.Test);

router.post('/login',  userController.userLogin);

router.post('/register', userController.userCreate);

router.put('/', auth.isAuthenticated, userController.userUpdate);

router.delete('/', auth.isAuthenticated, userController.userDelete);

router.get('/', auth.isAuthenticated, userController.userFindAll);

module.exports = router;



