import dotenv from 'dotenv';
dotenv.config();

import { app } from "./app";
import { connect } from "./db";

connect()
app.start()
