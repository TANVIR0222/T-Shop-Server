import Router from 'express'
import { login, logout, register } from '../controller/user.auth.controller.js';

const userAuthRoute = Router()

userAuthRoute.post('/register' ,register)
userAuthRoute.get('/login' ,login)
userAuthRoute.post('/logout' ,logout)

export default userAuthRoute;  //export the router to use in other files