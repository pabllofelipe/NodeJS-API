const userController = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/auth')
// ==> Definindo as rotas do CRUD - 'Product':

// ==> Rota responsável por criar um novo 'Product': (POST): localhost:3000/api/products
module.exports = (app)=>
{
    app.post('/user', userController.createUser);
    app.get('/user/:id', userController.findUser);
    app.delete('/user/:id', userController.deleteUser);
    app.get('/login', userController.login);
    //app.use(authMiddleware)
    app.put('/user/:id', userController.updateUser);

};