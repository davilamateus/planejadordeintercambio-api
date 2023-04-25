const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const usersModels = require('./../../models/users/users');
const userOptionsModel = require('./../../models/userOptions/userOptions');
const emailVeridatorModels = require('./../../models/emailVeridator/emailVeridator');
const newPasswordModels = require('./../../models/newPassword/newPassword');
const randtoken = require('rand-token');
const JWTsecret = require('./../../Middleware/JWTsecret');
const auth = require('./../../Middleware/userMiddleware');
const sendEmail = require('./../../sendEmails/sendEmail')
const confirmEmail = require('../../sendEmails/emailsHTML/confirmEmail/confirmEmail')
const newPasswordEmail = require('../../sendEmails/emailsHTML/newPassword/newPassword')


var token = randtoken.generate(16);


//Add User
router.post('/user/add', (req, res) => {

    const { email, password, name } = req.body;

    if (email !== undefined && password !== undefined && name !== undefined) {
        usersModels.findOne({ where: { email: email } }).then((user) => {
            if (user) {
                res.status(203).json({ message: 'Email used' });
            } else {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt)
                usersModels.create({
                    email: email,
                    name: name,
                    verified: false,
                    password: hash,
                    category: 2,
                }).then((data) => {
                    // create data of validate email
                    emailVeridatorModels.create({
                        userId: data.id,
                        token: token,
                        used: false
                    }).then(() => {
                        sendEmail(email, 'Planejador de Intercâmbio - Confirme o seu email.', confirmEmail(name, token))
                        res.status(200).json({ message: 'User add' });
                    })
                })
            }
        });

    } else {
        res.status(203).json({ error: 'Lack of informations' }
        )
    }
});


//confirm email

router.get('/user/confirm-email/:token', (req, res) => {
    const tokenConfirm = req.params.token;
    emailVeridatorModels.findOne({
        where: {
            token: tokenConfirm
        }
    })
        .then((data) => {
            if (data) {
                if (data.used === false) {
                    usersModels.update(
                        { verified: true },
                        { where: { id: data.userId } })
                        .then(() => {
                            emailVeridatorModels.update(
                                { used: true },
                                { where: { userId: data.userId } })
                                .then(() => {
                                    res.status(200).json({ sucess: 'Email Confirmed' })
                                })
                        });
                } else { res.status(300).json({ error: 'Token Used' }) }
            } else { res.status(300).json({ error: 'Token Invalide' }) }

        });
});



// Login 
router.post('/user/login', (req, res) => {

    const { email, password } = req.body;

    if (email !== null && password !== null) {
        // Verfication if user already
        usersModels.findOne({ where: { email: email } })
            .then((data) => {
                if (data !== null) {
                    const tokenJwt = jwt.sign({ id: data.id, category: data.category, time: new Date() }, JWTsecret, { expiresIn: '500h' });
                    // Verfication of password
                    let correct = bcrypt.compareSync(password, data.password);
                    if (correct) {
                        // Verication if user is a Adminstrator
                        if (data.category == '1') {
                            res.status(200).json({ message: 'Admin', token: tokenJwt, redirect: '/admin' });
                        } else {

                            if (data.verified == true) {
                                // Verfication if user Options already
                                userOptionsModel.findAll({
                                    where: { userId: data.id }
                                }).then((result) => {
                                    if (result.length > 0) {
                                        res.status(200).json({ message: 'Password Correct', token: tokenJwt, redirect: '/' });
                                    } else {
                                        res.status(200).json({ message: 'No user options', token: tokenJwt, redirect: '/quizz' });
                                    }
                                })

                            } else {
                                // Send Token for valitation
                                emailVeridatorModels.create({
                                    userId: data.id,
                                    token: token,
                                    used: false
                                }).then(() => {
                                    sendEmail(email, 'Planejador de Intercâmbio - Confirme o seu email.', confirmEmail(data.name, token))
                                    res.status(203).json({ error: 'User not verified, new email sended' });
                                })

                            }
                        }
                    } else { res.status(202).json({ message: 'Password incorrect' }); }
                } else { res.status(202).json({ error: 'User no fault' }); }
            });
    } else {
        res.status(203).json({ error: 'Lack of informations' });
    }
});


//Get Only User Name

router.get('/user/name', auth, (req, res) => {
    usersModels.findOne({
        where: { id: req.user.id }
    }).then((data) => {
        if (data.name) {
            res.status(200).json(data.name)
        } else {
            res.status(404).json({ message: 'No fault' })
        }
    })
})


// Forget Password Gerator
router.post('/user/forget-password/add/', (req, res) => {
    const { email } = req.body;

    let dateExpiration = new Date().getTime() + 300000;

    usersModels.findOne({
        where: { email: email }
    }).then((data) => {
        if (data) {
            if (data.verified === false) {
                //sendEmailConfirm(email)
                emailVeridatorModels.create({
                    userId: data.id,
                    token: token,
                    used: false
                }).then(() => {
                    sendEmail(email, 'Planejador de Intercâmbio - Confirme o seu email.', confirmEmail(data.name, token))
                    res.status(203).json({ error: 'User not verified, new email sended' });
                })
            } else {
                newPasswordModels.create({
                    token: token,
                    email: email,
                    expiration: dateExpiration,
                    used: false
                }).then(() => {
                    sendEmail(email, 'Planejador de Intercâmbio - Nova senha.', newPasswordEmail(data.name, token))

                    res.status(200).json({ success: 'Email Send' })
                }).catch((error) => {
                    res.status(400).json({ error: error })
                })
            }
        } else {
            res.status(404).json({ error: 'Fault User' })
        }
    }).catch((error) => {
        res.status(400).json({ error: error })
    })

})

// Forget Password Change password

router.post('/user/forget-password', (req, res) => {
    const { token, password } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt)
    if (token !== undefined && password !== undefined) {
        newPasswordModels.findOne({
            where: { token: token }
        }).then((data) => {
            if (data) {
                if (data.used == false) {
                    if ((new Date(data.createdAt).getTime() + 300000) > new Date().getTime()) {
                        usersModels.update(
                            { password: hash },
                            { where: { email: data.email } })
                            .then(() => {
                                res.status(200).json({ success: 'Password changed' })
                            })

                    } else {
                        res.status(204).json({ error: ' Token expired' })

                    }


                } else {
                    res.status(203).json({ error: 'Invalid Token' })
                }
            } else {
                res.status(203).json({ error: 'Invalid Token' })

            }

        })

    } else {
        res.status(203).json({ error: 'Lack Informations' })

    }

})




module.exports = router