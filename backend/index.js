import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import root from './routes/root.js';
import mongoose from 'mongoose';
import { logEvent, logger } from './middlewares/logger.js';
import connectDb from './configs/connectDB.js';
import { errorHandler } from './middlewares/errorHandler.js';
import corsOptions from './configs/corsOptions.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

connectDb();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, '/public')));
app.use("/", root)

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/user", userRoutes);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('text').send('404 Not Found')
    }
})

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

mongoose.connection.once('open', () => {
    console.log("connected to MongoDB")
    app.listen(PORT, () => {
        console.log(`app run on http://localhost:${PORT}`)
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})

