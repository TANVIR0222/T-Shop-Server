import Router from 'express'
import { addToCart } from '../controller/cart.controller.js';

const cartRoute = Router();

cartRoute.post('/add-cart' , addToCart)

export default cartRoute;  //exportando o router para ser usado em outro arquivo
