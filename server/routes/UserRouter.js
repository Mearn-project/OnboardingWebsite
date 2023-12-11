const express = require('express');
const { register, sendEmail, login, logout, verifyRegistrationToken, parseToken } = require('../controllers/UserController');
const { createUserValidation, loginUserValidation, resetValidation } = require('../services/UserMiddleware');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('hello')
    })

// send registration link
// router.post('/register', sendEmail);


// router.route('/login')
//     .get((req, res) => {
//         res.render('login/index')
//     })
//     .post(loginUserValidation, login)

// user register
router.route('/register/:token')
    .get(verifyRegistrationToken, (req, res) => {
        res.send('registration succeed');
    })
    .post(createUserValidation, register)


router.route('/login')
    .post(loginUserValidation, login)
    // .get((req, res) => {
    //     res.render('login/index')
    // })



router.get('/logout', logout)

router.get('/parseToken', parseToken)

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