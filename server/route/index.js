import { Router } from 'express';
import userRoutes from './api/user';
import propertyRoutes from './api/property';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    status: '200',
    message: 'Welcome to Propertypro--Lite API',
  });
});
routes.use('/auth/', userRoutes);
routes.use('/property', propertyRoutes);
export default routes;
