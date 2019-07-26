import { Router } from 'express';
import UserController from '../../controller/userController';
import DoValidation from '../../middleware/validation/dovalidation';


const userRoutes = Router();

userRoutes.post(
  '/signup',
  DoValidation.email,
  DoValidation.password,
  DoValidation.userName,
  DoValidation.phoneNumber,
  DoValidation.useraddress,
  UserController.register,
);

userRoutes.post(
  '/signin',
  DoValidation.email,
  DoValidation.password,
  UserController.signin,
);

userRoutes.post(
  '/:email/reset_password',
  DoValidation.email,
  UserController.passwordReset,
);

export default userRoutes;
