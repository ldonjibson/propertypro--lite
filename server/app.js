import express from 'express';
import path from 'path';
import bodyparser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import swaggerUi from 'swagger-ui-express';
import routes from './route/index';
import swaggerdoc from '../swagger.json';

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../UI')));
app.use('/api/v1/', routes);
app.get('/', (req, res) => res.sendFile('../UI/index.html'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerdoc));

app.all('*', (req, res) => {
  res.status(404).json({
    status: '404',
    message: 'Page Not Found',
  });
});

const port = process.env.PORT || 3001;
app.listen(port);
export default app;