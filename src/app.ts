import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import  routes from './routes';
import { testConnection } from './repos/db';

dotenvFlow.config();

//variable for express application
const app: Application = express();




export function startServer() {

    //JSON body parser
    app.use(express.json());

    //basic route
  app.use('/api', routes);

  testConnection();
  
  

  //start the server
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}