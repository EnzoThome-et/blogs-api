const express = require('express');
require('dotenv').config();

const app = express();

const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const postsController = require('./controllers/postsController');
const { verifyToken } = require('./controllers/middlewares/verifyToken');

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', userController.create);

app.post('/login', userController.login);

app.get('/user', verifyToken, userController.getAll);

app.get('/user/:id', verifyToken, userController.getById);

app.post('/categories', verifyToken, categoriesController.create);

app.get('/categories', verifyToken, categoriesController.getAll);

app.post('/post', verifyToken, postsController.create);

app.get('/post', verifyToken, postsController.getAll);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
