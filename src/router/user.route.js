import Router from 'express'
import { singleUser, updateRole } from '../controller/user.controller.js';

const userRoute = Router()

userRoute.patch('/update-role/:id', updateRole)
userRoute.get('/single-user/:id', singleUser)

export default userRoute; 