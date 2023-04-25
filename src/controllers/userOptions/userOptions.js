
const express = require('express');
const router = express.Router();
const path = require('path')
const uuid = require('uuid')
const multer = require('multer')
const userOptionsModel = require('./../../models/userOptions/userOptions');
const auth = require('./../../Middleware/userMiddleware');
const quizReponsers = require('../../models/quizReponsers/quizReponsers');
const plannersSuggestions = require('../../models/plannersSuggestions/plannersSuggestions');
const planners = require('../../models/planners/planners');
const plannersAttachments = require('../../models/plannersAttachments/plannersAttachments');
const plannersComments = require('../../models/plannersComments/plannersComments');
const plannersSteps = require('../../models/plannersSteps/plannersSteps');
const planneSuggestionsList = require('./plannersSuggestions');
const Users = require('../../models/users/users');
const cities = require('../../models/cities/cities');
const countries = require('../../models/countries/countries');


// Get User Options
router.get('/user/useroptions', auth, (req, res) => {
    userOptionsModel.findOne({
        where: { userId: req.user.id }
    }).then((data) => {
        if (data !== null) {
            Users.findOne({
                where: { id: req.user.id }
            }).then((result) => {
                cities.findOne({
                    where: { id: data.cityId },
                    include: [{ model: countries }]
                }).then((city) => {
                    const user = {
                        name: result.name,
                        email: result.email,
                        city: city,
                        when: data.when,
                        budget: data.budget,
                        adsGroup: data.adsGroup,
                        photo: data.photo,
                    }
                    res.status(200).json(user)
                })

            })
        } else {
            res.status(301).json({ error: 'No user options' });
        }
    })
})

//Add User Options
router.post('/user/useroptions', auth, (req, res) => {

    const { photo, cityId, when, budget, countryId } = req.body;

    if (photo !== undefined && cityId !== undefined && when !== undefined && budget !== undefined && countryId !== undefined) {
        quizReponsers.findOne({
            where: { userId: req.user.id }
        }).then((result) => {

            let adsGroup = 0
            if (result.response1 == '1' && result.response1_1 == '1') {
                adsGroup = 1
            } else if (result.response1 == '1' && result.response1_1 == '2') {
                adsGroup = 2
            } else {
                adsGroup = 3
            }
            const suggestionList = planneSuggestionsList(countryId);
            suggestionList.map((item) => {
                planners.create({
                    title: item.title,
                    descriptions: item.descriptions,
                    category: item.category,
                    status: 0,
                    position: 0,
                    userId: req.user.id
                }).then((creadingStepsAttchaments) => {
                    if (item.steps.length > 0) {
                        item.steps.map((steps) => {
                            plannersSteps.create({
                                title: steps,
                                status: false,
                                plannerId: creadingStepsAttchaments.id,
                                userId: req.user.id
                            })
                        })
                    }
                    if (item.attchaments.length > 0) {
                        item.attchaments.map((attchaments) => {
                            plannersAttachments.create({
                                title: attchaments.title,
                                link: attchaments.link,
                                plannerId: creadingStepsAttchaments.id,
                                userId: req.user.id
                            })
                        })
                    }
                })
            })
            userOptionsModel.create({
                photo: photo,
                budget: budget,
                when: when,
                cityId: cityId,
                adsGroup: adsGroup,
                userId: req.user.id
            }).then(() => {
                res.status(200).json({ message: 'Add' });
            })


        })

    } else {
        res.status(203).json({ error: 'Lack of informations' })
    }
});


//Edit User Options
router.patch('/user/useroptions', auth, (req, res) => {

    const { cityId, when, budget, name } = req.body;

    if (cityId !== undefined && when !== undefined && budget !== undefined && name !== undefined) {
        userOptionsModel.update(
            {
                budget: budget,
                when: when,
                cityId: cityId,
                userId: req.user.id
            }, {
            where: { userId: req.user.id }
        }
        ).then(() => {
            Users.update({
                name: name
            }
                , {
                    where: { id: req.user.id }
                })
        }).then(() => {
            res.status(200).json({ message: 'Update' });
        })

    } else {
        res.status(203).json({ error: 'Lack of informations' })
    }
});

//Edit Photo
router.patch('/user/useroptions/photo', auth, (req, res) => {
    const { photo, } = req.body;

    if (photo !== undefined) {
        userOptionsModel.update(
            {
                photo: photo,
            }, {
            where: { userId: req.user.id }
        }
        ).then(() => {
            res.status(200).json({ message: 'Update' });
        })

    } else {
        res.status(203).json({ error: 'Lack of informations' })
    }
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + './../../../public/img/user')
    },
    filename: function (req, file, cb) {
        const namePhoto = uuid.v4() + Date.now() + '.png'
        cb(null, namePhoto)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);

        callback(null, true)
    },
    onFileUploadStart: function (file) {
    },
});

router.post('/user/photo', upload.single('file'), function (req, res, next) {
    const result = req.file
    res.status(200).json(result)
    return false;
})


module.exports = router
