const express = require('express');
const { register, sendEmail, login, logout, verifyRegistrationToken } = require('../controllers/UserController');
const { createUserValidation, loginUserValidation, resetValidation } = require('../services/UserMiddleware');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('hello')
    })

// send registration link
// router.post('/register', sendEmail);

// user register
router.route('/register/:token')
    .get(verifyRegistrationToken, (req, res) => {

        // TODO:
        // Should redirect to another page for user to complete registration
        res.send('registration succeed');

        // res.render('registration', { tokenData: req.tokenData });
})

router.route('/register/complete')
    .post(createUserValidation, register)


router.route('/login')
    .post(loginUserValidation, login)
    // .get((req, res) => {
    //     res.render('login/index')
    // })



router.get('/logout', logout)

// router.get('/admin', async (req, res) => {

//     if (req.headers.cookie && req.headers.cookie.includes('token')) {

//         // const info = [];
//         // info = await getAllusers();
//         res.render('admin', {
//             // info,
//             isLoggedIn: true
//         })

//     } else {
//         res.render('index', {
//             isLoggedIn: false,
//         });
//     }
// })



module.exports = router;