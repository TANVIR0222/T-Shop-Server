import Router from 'express'
import { allOrders, placeOrder, placeOrderStripe, updateStatus , singleOrders, verifyStripe} from '../controller/order.controller.js';

const orderRoute = Router()

orderRoute.get('/list' , allOrders)
orderRoute.get('/single-list/:id' , singleOrders)
orderRoute.patch('/status/:id' , updateStatus)

// for Payment
orderRoute.post('/place' , placeOrder )
orderRoute.post('/stripe' , placeOrderStripe )

// for user 
orderRoute.post('/userorders' , placeOrderStripe )
orderRoute.post('/verifyStripe' , verifyStripe )

export default orderRoute;  //exportando o router para ser usado em outro arquivo