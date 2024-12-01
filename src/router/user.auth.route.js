import Router from 'express'
import { getUser, register } from '../controller/user.auth.controller.js';

const userAuthRoute = Router()

userAuthRoute.post('/register' ,register)
userAuthRoute.get('/user' ,getUser)

export default userAuthRoute;  //export the router to use in other files