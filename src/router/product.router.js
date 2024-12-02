import Router from 'express'
import { addProduct, getAllProduct } from '../controller/product.controller.js';
import upload from '../utils/multer.js';

const productRoute = Router()

productRoute.post('/add-product', upload.single('image') , addProduct)
productRoute.get('/all-product', getAllProduct)

export default productRoute;  