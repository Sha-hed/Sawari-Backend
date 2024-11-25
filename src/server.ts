import mongoose from 'mongoose'
import app from './app'
import config from './app/config';
const port = 5000

async function main() {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
        console.log(`Bike Store application is listening on PORT :  ${config.port}`)
    })  
  }
main()
