// express libraries
import { Router } from 'express';

// controllers
import PropertyController from '../../controller/propertyController';
import AccountValidation from '../../middleware/validation/accountValidation';

// helpers
import AuthMiddleware from '../../middleware/authMiddleware/authMiddleware';
import DoValidation from '../../middleware/validation/dovalidation';
import UploadingImage from '../../helper/imageupload/index';


// account routes
const propertyRoutes = Router();
propertyRoutes.post('/',
  AuthMiddleware.checkIfUserIsAuthenticated,
  AuthMiddleware.checkUserById,
  AccountValidation.agentChecker,
  DoValidation.address,
  UploadingImage.uploadFile,
  PropertyController.postProperty);

propertyRoutes.patch('/:propertyId',
  AuthMiddleware.checkIfUserIsAuthenticated,
  AuthMiddleware.checkUserById,
  AccountValidation.agentChecker,
  DoValidation.address,
  UploadingImage.uploadFile,
  PropertyController.updateProperty);
export default propertyRoutes;
