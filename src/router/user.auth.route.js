import Router from 'express'
import { login, register } from '../controller/user.auth.controller.js';

const userAuthRoute = Router()

userAuthRoute.post('/register' ,register)
userAuthRoute.get('/login' ,login)

export default userAuthRoute;  //export the router to use in other files