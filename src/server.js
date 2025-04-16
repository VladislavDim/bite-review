import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cityRoutes from './routes/city.routes.js';
import userRoutes from './routes/user.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api/cities', cityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

app.get('/', (req, res) => {
  res.send('BiteReview API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
