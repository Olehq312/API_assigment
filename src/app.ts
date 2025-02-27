import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import  routes from './routes';
import { testConnection } from './repos/db';
import cors from 'cors';
import { setUpSwagger } from './util/docs';


dotenvFlow.config();

//variable for express application
const app: Application = express();



function setupCors() {
  app.use(cors({

  origin: '*', // allow to server to accept request from different origin
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ['auth-token', 'Origin', 'X-Requested-Width', 'Content-Type', 'Accept'],
  credentials: true // allow session cookie from browser

}));
}




export function startServer() {

    //setup cors
    setupCors();

    //JSON body parser
    app.use(express.json());

    //basic route
  app.use('/api', routes);
  setUpSwagger(app);

  testConnection();
  
  

  //start the server
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}