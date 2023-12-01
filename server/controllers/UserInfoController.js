const User = require('../models/User');

const getUserInfo = async (req, res) => {
    try {

        const userId = req.params.userId;
        const user = await User.findById(userId)
            .populate('application')
            .populate('visa')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'});
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Personal information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getUserInfo, updateUserInfo }