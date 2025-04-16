import City from '../models/city.model.js';

export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cities' });
  }
};
