import Router from 'express'
import { addProduct, deleteProduct, getAllProduct } from '../controller/product.controller.js';
import upload from '../utils/multer.js';

const productRoute = Router()

productRoute.post('/add-product', upload.single('image') , addProduct)
productRoute.get('/all-product', getAllProduct)
productRoute.delete('/delete-product/:id', deleteProduct)

export default productRoute;  