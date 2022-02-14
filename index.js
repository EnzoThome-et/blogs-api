const express = require('express');
require('dotenv').config();

const app = express();

const userController = require('./controllers/userController');

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', userController.create);

app.post('/login', userController.login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
