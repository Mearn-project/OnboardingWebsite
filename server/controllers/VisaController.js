const Visa = require('../models/Visa');
const User = require('../models/User');

const getVisaInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const user = await User.findById(userId).populate('visa');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.visa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateVisaInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (updatedData.optReceipt) {
            user.visa.optReceipt = { ...user.visa.optReceipt, ...updatedData.optReceipt };
        }
    
        if (updatedData.optEAD) {
            user.visa.optEAD = { ...user.visa.optEAD, ...updatedData.optEAD };
        }
    
        if (updatedData.i983) {
            user.visa.i983 = { ...user.visa.i983, ...updatedData.i983 };
        }
    
        if (updatedData.i20) {
            user.visa.i20 = { ...user.visa.i20, ...updatedData.i20 };
        }

        await user.save();

        res.json({ message: 'Visa status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getVisaInfo, updateVisaInfo };