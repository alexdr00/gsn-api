/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import server from './src/server';
import Logger from './src/lib/Logger';

const { app } = server;

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  Logger.success(`Server is listening on port ${PORT}`);
});
