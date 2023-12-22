import { productsService } from '../services/products.service.js';
import { cartsService } from '../services/carts.service.js';
import { logger } from '../winston.js';

class ViewsController {
    loginRender = (req, res) => {
        res.render('login');
    }

    loginErrorRender = (req, res) => {
        res.render("loginerror");
    }

    signupRender = (req, res) => {
        res.render("signup");
    }

    registerErrorRender = (req, res) => {
        res.render("signuperror");
    }

    productsRender = async (req, res) => {
        const products = await productsService.findAll();
        if (req.user) {
            const { first_name, last_name, role, cart } = req.user;
            const cartId = cart._id;
            res.render('products', { products, first_name, last_name, role, cartId });
        } else {
            const { first_name, last_name, role, cart } = req.session;
            const cartId = cart._id;
            res.render('products', { products, first_name, last_name, role, cartId });
        }
    }

    populatedCartRender = async (req, res) => {
        const cartId = req.params.cid;
        const cartFound = await cartsService.findAndPopulate(cartId);
        res.render('cart', { cartFound });
    }

    productDetailsRender = async (req, res) => {
        const productId = req.params.pid;
        const productFound = await productsService.findById(productId);
        const userCart = req.user ? req.user.cart : req.session.cart;
        const cartId = userCart._id;
        const { _id, title, description, price, stock, category } = productFound;
        res.render('details', { _id, title, description, price, stock, category, cartId });
    }

    createProductRender = (req, res) => {
        res.render('createProduct');
    }

    updateProductRender = (req, res) => {
        res.render('updateProduct');
    }

    deleteProductRender = (req, res) => {
        res.render('deleteProduct');
    }

    loggerTest = (req, res) => {
        logger.fatal("FATAL")
        logger.error("ERROR")
        logger.warning("WARNING")
        logger.info("INFO")
        logger.http("HTTP")
        logger.debug("DEBUG")
        res.status(400).json({ message: "Testeo de logger en consola" });
    }

}

export const viewsController = new ViewsController();