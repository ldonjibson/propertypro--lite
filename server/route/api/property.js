// express libraries
import { Router } from 'express';

// controllers
import PropertyController from '../../controller/propertyController';
import AccountValidation from '../../middleware/validation/accountValidation';

// helpers
import AuthMiddleware from '../../middleware/authMiddleware/authMiddleware';
import DoValidation from '../../middleware/validation/dovalidation';
import UploadingImage from '../../helper/imageupload/index';
import PropertyValidation from '../../middleware/validation/propertyValidation';

// account routes
const propertyRoutes = Router();
propertyRoutes.post('/',
  AuthMiddleware.checkIfUserIsAuthenticated,
  AccountValidation.agentChecker,
  DoValidation.type,
  DoValidation.address,
  DoValidation.price,
  UploadingImage.uploadFile,
  PropertyController.postProperty);

propertyRoutes.patch('/:propertyId',
  DoValidation.id,
  AuthMiddleware.checkIfUserIsAuthenticated,
  AccountValidation.agentChecker,
  PropertyValidation.propertyOwnerChecker,
  DoValidation.type,
  DoValidation.address,
  DoValidation.price,
  UploadingImage.uploadFile,
  PropertyController.updateProperty);

propertyRoutes.patch('/:propertyId/sold',
  DoValidation.id,
  AuthMiddleware.checkIfUserIsAuthenticated,
  AccountValidation.agentChecker,
  PropertyValidation.propertyOwnerChecker,
  PropertyController.updateStatusProperty);

propertyRoutes.delete('/:propertyId',
  DoValidation.id,
  AuthMiddleware.checkIfUserIsAuthenticated,
  AccountValidation.agentChecker,
  PropertyValidation.propertyOwnerChecker,
  PropertyController.deleteProperty);

propertyRoutes.get('/',
  AuthMiddleware.checkIfUserIsAuthenticated,
  PropertyController.listProperties);

propertyRoutes.get('/:propertyId',
  DoValidation.id,
  AuthMiddleware.checkIfUserIsAuthenticated,
  PropertyController.specificPropertyDetail);
export default propertyRoutes;
