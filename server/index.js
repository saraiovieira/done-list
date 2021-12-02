import express from 'express';
import { config } from 'dotenv';
import { connect } from './config/database.js';
config();
connect(); 

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const app = express();


app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });