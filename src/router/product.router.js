import Router from 'express'
import { addProduct, allProduct, deleteProduct, getAllProduct, singleProduct, updateProduct } from '../controller/product.controller.js';

const productRoute = Router()

productRoute.post('/add-product' , addProduct)
productRoute.get('/all-product', getAllProduct)
productRoute.delete('/delete-product/:id', deleteProduct)
productRoute.get('/single-product/:id', singleProduct)
productRoute.patch('/update-product/:id', updateProduct)
productRoute.get('/product', allProduct)

export default productRoute;  