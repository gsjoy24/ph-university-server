import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import seedSuperAdmin from './app/DB';
import config from './app/config';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`Server for ph university is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

//  handle unhandledRejection
process.on('unhandledRejection', () => {
  console.log('🚩🚩 unhandledRejection error 🚩🚩');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// handle uncaughtException
process.on('uncaughtException', () => {
  console.log('🚩🚩 uncaughtException error 🚩🚩');
  process.exit(1);
});
