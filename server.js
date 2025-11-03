import express from 'express';
import connectionDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
connectionDb();
app.get('/', (req,res)=>{
    res.send('Wellcome Blog-Backend!');
});
app.use(express.json({urlencoded: true, extended: true}));
app.use(cookieParser())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`);
});