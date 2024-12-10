import Router from 'express'
import { addProduct, allProduct, deleteProduct, getAllProduct, relatedProduct, singleProduct, updateProduct } from '../controller/product.controller.js';

const productRoute = Router()

productRoute.post('/add-product' , addProduct)
productRoute.delete('/delete-product/:id', deleteProduct)
productRoute.get('/single-product/:id', singleProduct)
productRoute.patch('/update-product/:id', updateProduct)
productRoute.get('/product', allProduct)
productRoute.get('/related-Product/:id', relatedProduct)
productRoute.get('/all-product', getAllProduct)

export default productRoute;  