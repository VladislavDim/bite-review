import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 
const allowedOrigins = [process.env.FRONTEND_URL];

const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});

export default corsMiddleware;
