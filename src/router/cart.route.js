import Router from 'express'
import { addToCart, deleteCart, getAllCart, singleCart } from '../controller/cart.controller.js';

const cartRoute = Router();

cartRoute.post('/add-cart' , addToCart)
cartRoute.get('/all-cart' , getAllCart)
cartRoute.delete('/delete-cart/:id' , deleteCart)
cartRoute.get('/single-cart/:id' , singleCart)

export default cartRoute;  //exportando o router para ser usado em outro arquivo
