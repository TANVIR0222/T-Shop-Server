import Router from 'express'
import { allOrders, placeOrder, placeOrderStripe, updateStatus } from '../controller/order.controller.js';

const orderRoute = Router()

orderRoute.post('/list' , allOrders)
orderRoute.post('/status' , updateStatus)

// for Payment
orderRoute.post('/place' , placeOrder )
orderRoute.post('/stripe' , placeOrderStripe )

// for user 
orderRoute.post('/userorders' , placeOrderStripe )

export default orderRoute;  //exportando o router para ser usado em outro arquivo