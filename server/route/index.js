import { Router } from 'express';
import userRoutes from './api/user';


const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    status: '200',
    message: 'Welcome to Propertypro--Lite API',
  });
});
routes.use('/auth', userRoutes);

export default routes;
