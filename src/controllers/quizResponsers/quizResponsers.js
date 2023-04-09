
const express = require('express');
const router = express.Router();
const quizResponsers = require('../../models/quizReponsers/quizReponsers');
const auth = require('../../Middleware/userMiddleware');
const authAdmin = require('../../Middleware/adminMiddleware');
const CalcCity = require('./useCalcCity');
const cities = require('../../models/cities/cities');
const countries = require('../../models/countries/countries');


// Add Responses
router.post('/user/quizresponses', auth, (req, res) => {
    const { response1, response1_1, response2, response3, response4, response5, response6, response7, } = req.body;

    if (response1 !== undefined && response1_1 !== undefined && response2 !== undefined && response3 !== undefined && response4 !== undefined && response5 !== undefined && response6 !== undefined && response7 !== undefined) {
        quizResponsers.create({
            response1: response1,
            response1_1: response1_1,
            response2: response2,
            response3: response3,
            response4: response4,
            response5: response5,
            response6: response6,
            response7: response7,
            userId: req.user.id
        })
            .then(() => {
                if (response7 == 0) {
                    res.status(202).json({ message: 'Add' })
                } else {
                    cities.findOne({
                        where: { id: (CalcCity(response1, response1_1, response2, response3, response4, response5, response6, response7).cityId) },
                        include: [{ model: countries }]

                    }).then((data) => {
                        res.json(data).status(200);
                    })

                }

            })
            .catch((error) => { res.status(400).json(error) })


    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});

router.get('/admin/quizresponse', authAdmin, (req, res) => {

    const userId = req.query['userId'];
    console.log(userId)

    if (userId !== undefined) {

        quizResponsers.findOne({
            where: { userId: userId }
        }).then((data) => {
            if (data !== null) {
                res.status(200).json(data)
            }
        })

    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
})




router.post('/user/teste', (req, res) => {
    const { response1, response1_1, response2, response3, response4, response5, response6, response7, } = req.body;

    if (response1 !== undefined && response1_1 !== undefined && response2 !== undefined && response3 !== undefined && response4 !== undefined && response5 !== undefined && response6 !== undefined && response7 !== undefined) {
        res.json((CalcCity(2, 0, 1, 1, 1, 1, 1, 1).cityId)
        )

    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


module.exports = router
