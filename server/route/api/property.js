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
  DoValidation.id,
  AuthMiddleware.checkIfUserIsAuthenticated,
  AuthMiddleware.checkUserById,
  AccountValidation.agentChecker,
  DoValidation.address,
  UploadingImage.uploadFile,
  PropertyController.updateProperty);

// propertyRoutes.patch('/:propertyId/sold',
//   DoValidation.id,
//   AuthMiddleware.checkIfUserIsAuthenticated,
//   AuthMiddleware.checkUserById,
//   AccountValidation.agentChecker,
//   PropertyController.updateStatusProperty);

// propertyRoutes.delete('/:propertyId',
//   AuthMiddleware.checkIfUserIsAuthenticated,
//   AuthMiddleware.checkUserById,
//   AccountValidation.agentChecker,
//   PropertyController.deleteProperty);

// propertyRoutes.get('/',
//   PropertyController.listProperties);

// propertyRoutes.get('/:propertyId',
//   DoValidation.id,
//   PropertyController.specificPropertyDetail);
export default propertyRoutes;
