import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(
        `Bike Store application is listening on PORT :  ${config.port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}
main();
