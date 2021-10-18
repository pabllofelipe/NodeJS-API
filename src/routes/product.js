const productController = require('../controllers/product_controller');
const authMiddleware = require('../middlewares/auth')

module.exports = (app)=>
{
    app.get('/product/index',authMiddleware,productController.index);
}