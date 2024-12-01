import Router from 'express'
import { register } from '../controller/user.auth.controller.js';

const userAuthRoute = Router()

userAuthRoute.post('/register' ,register)

export default userAuthRoute;  //export the router to use in other files