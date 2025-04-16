import City from '../models/city.model.js';

export const getAllCities = async (req, res) => {
    try {
        const search = req.query.search;

        const filter = search
            ? { name: { $regex: search, $options: 'i' }, }
            : {};

        const cities = await City.find(filter).sort({ name: 1 });

        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cities' });
    }
};
