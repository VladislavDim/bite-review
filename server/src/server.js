import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cityRoutes from './routes/city.routes.js';
import userRoutes from './routes/user.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';
import paths from './utils/paths.js';
import reviewRoutes from './routes/review.routes.js';
import authRoutes from './routes/auth.routes.js';
import corsMiddleware from './middlewares/cors.middleware.js';
import { createStaticFileGuard, staticRateLimiter } from './middlewares/static-file-guard.middleware.js';
import errorHandler from './middlewares/error-handler.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(corsMiddleware);
app.use(express.json());
app.use('/uploads',
  staticRateLimiter,
  createStaticFileGuard(),
  express.static(paths.uploads, { index: false })
);
app.use('/public',
  staticRateLimiter,
  createStaticFileGuard(undefined, 'public, max-age=86400'),
  express.static('public', { index: false })
);
app.use('/api/cities', cityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.get('/', (_, res) => {
  res.send('BiteReview API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
