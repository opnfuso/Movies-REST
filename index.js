import express from 'express';
import slash from 'express-slash';
import swaggerUi from 'swagger-ui-express';

import config from './config/index.js';
import moviesApi from './routes/movies.js';
import {
  errorHandler,
  logErrors,
  wrapErrors,
} from './utils/middlewares/errorHandlers.js';
import notFoundHandler from './utils/middlewares/notFoundHandler.js';
import swaggerDocument from './swagger.json';

const app = express();

// Body parser
app.use(express.json());

// Routes
moviesApi(app);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', async (req, res, next) => {
  try {
    res.send('Welcome, go to /docs');
  } catch (error) {
    next(error);
  }
});

// Catch 404
app.use(notFoundHandler);

app.use(slash());

// Errors middlewares
app.use(wrapErrors);
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
