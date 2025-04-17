import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import City from '../src/models/city.model.js';
import paths from '../src/utils/paths.js';

dotenv.config();


const seedCities = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const dataPath = path.join(paths.data, 'cities.seed.json');
        const cities = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        await City.deleteMany();
        console.log('Existing cities cleared');

        await City.insertMany(cities);
        console.log(`${cities.length} cities inserted`);

        process.exit();
    } catch (error) {
        console.error('Error seeding cities:', error.message);
        process.exit(1);
    }
};

seedCities();
