// eslint-disable-next-line no-console
import express from 'express';
import path from 'path';
import bodyparser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import routes from './route/index';

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../UI')));
app.use('/api/v1/', routes);
app.get('/', (req, res) => res.sendFile('../UI/index.html'));

app.all('*', (req, res) => {
  res.status(404).json({
    status: '404',
    message: 'Page Not Found',
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

export default app;