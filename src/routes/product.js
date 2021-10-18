const productController = require('../controllers/product_controller');
const authMiddleware = require('../middlewares/auth')

module.exports = (app)=>
{
    app.use(authMiddleware);
    app.get('/product/index',productController.index);
}