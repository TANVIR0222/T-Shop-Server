import Router from 'express'
import { addProduct } from '../controller/product.controller.js';
import upload from '../utils/multer.js';

const productRoute = Router()

productRoute.post('/add-product', upload.single('image') , addProduct)

export default productRoute;  