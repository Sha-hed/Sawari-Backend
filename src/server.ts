import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    // Connecting to the MongoDB database
    await mongoose.connect(config.database_url as string);

    // Starting the server and listening on the specified port
    server = app.listen(config.port, () => {
      console.log(
        `Bike Store application is listening on PORT :  ${config.port}`, // Logging the server's listening port
      );
    });
  } catch (error) {
    // Handling any errors during the connection or server startup
    console.log(error);
  }
}

main(); // Call the main function 
