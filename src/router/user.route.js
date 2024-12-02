import Router from 'express'
import { updateRole } from '../controller/user.controller.js';

const userRoute = Router()

userRoute.patch('/update-role/:id', updateRole)

export default userRoute; 