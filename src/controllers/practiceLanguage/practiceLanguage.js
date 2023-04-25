
const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const Sequelize = require('sequelize')
const practiceLanguage = require('./../../models/practiceLanguage/practiceLanguage');



//Add Pracitve Language
router.post('/practivelanguage', auth, (req, res) => {

    const { language, original, portuguese } = req.body;

    if (language !== undefined && portuguese !== undefined && original !== undefined) {
        practiceLanguage.create({
            language: language,
            original: original,
            portuguese: portuguese,
        })
            .then((data) => { res.status(201).json(data) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


//Update Pracitve Language
router.patch('/practivelanguage', auth, (req, res) => {

    const { language, original, portuguese, id } = req.body;

    if (language !== undefined && portuguese !== undefined && original !== undefined && id !== undefined) {
        practiceLanguage.update({
            language: language,
            original: original,
            portuguese: portuguese,
        },
            {
                where: {
                    [Op.and]: [{ id: id }]
                }
            }
        )
            .then(() => { res.status(201).json({ success: 'Update' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
});

//Delete Pracitve Language
router.delete('/practivelanguage', auth, (req, res) => {

    const id = req.query['id'];

    if (id !== undefined) {
        practiceLanguage.destroy(
            {
                where: {
                    [Op.and]: [{ id: id }]
                }
            }
        )
            .then(() => { res.status(201).json({ success: 'Delete' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
});



// Get list of Pracitve Language

router.get('/practivelanguage', (req, res) => {
    const language = req.query['language'];

    practiceLanguage.findOne({

        order: [
            [Sequelize.literal('RAND()')]
        ], where: { language: language },

    }).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(400).json(error)
    });

});




module.exports = router
