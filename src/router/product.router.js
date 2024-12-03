import Router from 'express'
import { addProduct, deleteProduct, getAllProduct, singleProduct } from '../controller/product.controller.js';

const productRoute = Router()

productRoute.post('/add-product' , addProduct)
productRoute.get('/all-product', getAllProduct)
productRoute.delete('/delete-product/:id', deleteProduct)
productRoute.get('/single-product/:id', singleProduct)

export default productRoute;  