const userController = require('../controllers/user_controller');

// ==> Definindo as rotas do CRUD - 'Product':

// ==> Rota responsável por criar um novo 'Product': (POST): localhost:3000/api/products
module.exports = (app)=>
{
    app.post('/user', userController.createUser);
    app.get('/user/:id', userController.findUser);
    app.delete('/user/:id', userController.deleteUser);
    //app.put('/user/:id', userController.updateUser)
};