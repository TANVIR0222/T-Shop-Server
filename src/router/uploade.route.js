import Router from 'express'
import upload from '../utils/multer.js';
import uploadeCloudinary from '../controller/uploade.controller.js';

const imageUploadeRoute = Router()

imageUploadeRoute.post('/uploade', upload.single('image')  , uploadeCloudinary)

export default imageUploadeRoute;  