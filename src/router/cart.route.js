import Router from 'express'
import { addToCart, getAllCart } from '../controller/cart.controller.js';

const cartRoute = Router();

cartRoute.post('/add-cart' , addToCart)
cartRoute.get('/all-cart' , getAllCart)

export default cartRoute;  //exportando o router para ser usado em outro arquivo
