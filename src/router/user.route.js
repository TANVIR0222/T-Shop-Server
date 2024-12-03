import Router from 'express'
import { allUser, singleUser, updateRole } from '../controller/user.controller.js';

const userRoute = Router()

userRoute.patch('/update-role/:id', updateRole)
userRoute.get('/single-user/:id', singleUser)
userRoute.get('/all-user', allUser)

export default userRoute; 