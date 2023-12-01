const Visa = require('../models/Visa');

const getVisaInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const visa = await Visa.findOne({ user: userId });
        if (!visa) {
            return res.status(404).json({ message: 'Visa status not found' });
        }
        res.json(visa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateVisaInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const visa = await Visa.findOneAndUpdate({ user: userId }, updatedData, { new: true });
        if (!visa) {
            return res.status(404).json({ message: 'Visa status not found' });
        }
        res.json({ message: 'Visa status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getVisaInfo, updateVisaInfo };