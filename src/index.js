import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import fileupload from 'express-fileupload';
// import logger from './utilis/logger'; // logger
import router from './routes'; //routes

// dotenv configuration
fs.existsSync('.env')
    ? dotenv.config({ path: '.env' })
    : logger.error(
          'can not find .env file. Please make sure .env file is present'
      );

// Create Express server
const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || 5000;
app.set('port', port);
app.disable('x-powered-by');

// apply middlewares
app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors(),
    helmet(),
    morgan('dev'),
    fileupload()
);

// routing
app.use(router);

// error handling for non exsistent routes
app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'This route does not exsist',
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
