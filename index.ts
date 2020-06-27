/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import server from './src/server';

const { app } = server;

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.info(`Server is listening on port ${PORT}`);
});
