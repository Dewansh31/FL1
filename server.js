import express from 'express';
import colors from 'colors';
import multer from 'multer';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// configure env
dotenv.config();

// database config
connectDB();

// esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// rest object
const app = express();

// middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
app.use(bodyParser.urlencoded({extended: true}));

// rest api
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// port
const PORT = process.env.PORT || 8080;



// run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`.bgCyan.white);
})