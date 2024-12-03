import Router from 'express'
import { allUser, deleteUser, singleUser, updateRole } from '../controller/user.controller.js';

const userRoute = Router()

userRoute.patch('/update-role/:id', updateRole)
userRoute.get('/single-user/:id', singleUser)
userRoute.get('/all-user', allUser)
userRoute.delete('/delete-user/:id', deleteUser)


export default userRoute; 