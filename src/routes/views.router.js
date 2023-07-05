import { Router } from 'express';
const router = Router();

import ProductManager from '../managers/productManager.js';
const productManager = new ProductManager('./src/db/products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('index', {products});
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {products});
});

export default router;