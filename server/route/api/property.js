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
  DoValidation.type,
  DoValidation.address,
  DoValidation.price,
  UploadingImage.uploadFile,
  PropertyController.updateProperty);

propertyRoutes.patch('/:propertyId/sold',
  DoValidation.id,
  AuthMiddleware.checkIfUserIsAuthenticated,
  AccountValidation.agentChecker,
  PropertyController.updateStatusProperty);

propertyRoutes.delete('/:propertyId',
  DoValidation.id,
  AuthMiddleware.checkIfUserIsAuthenticated,
  AccountValidation.agentChecker,
  PropertyController.deleteProperty);

propertyRoutes.get('/',
  PropertyController.listProperties);

propertyRoutes.get('/:propertyId',
  DoValidation.id,
  PropertyController.specificPropertyDetail);
export default propertyRoutes;
