import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the user management API');
});

connectDB();

app.use('/api', userRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

