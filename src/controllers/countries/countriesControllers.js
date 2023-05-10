const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const authAdmin = require('../../Middleware/adminMiddleware');
const CountriesModel = require('./../../models/countries/countries')
const CitiesModel = require('./../../models/cities/cities')






// Get List of Countries and Cities
router.get('/countries', (req, res) => {
    CountriesModel.findAll({
        include: [{ model: CitiesModel }]
    })
        .then((data) => { res.status(200).json(data) })
        .catch((error) => { res.status(400).json(error) });
});


// Get a Country and Cities
router.get('/country', (req, res) => {
    const id = req.query['id'];
    CountriesModel.findOne({
        include: [{ model: CitiesModel }],
        where: { id: id }
    })
        .then((data) => { res.status(200).json(data) })
        .catch((error) => { res.status(400).json(error) });
});




// Add Country
router.post('/admin/country', authAdmin, (req, res) => {
    const { title, flag, descriptions, englishTitle, currency, currencySymbol, language } = req.body;
    if (title !== undefined && flag !== undefined && descriptions !== undefined && currency !== undefined && englishTitle !== undefined && currencySymbol !== undefined) {
        CountriesModel.create({
            title: title,
            descriptions: descriptions,
            englishTitle: englishTitle,
            flag: flag,
            currency: currency,
            currencySymbol: currencySymbol,
            language: language
        })
            .then(() => { res.status(201).json({ success: 'Country Add' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


router.patch('/admin/country', authAdmin, (req, res) => {
    const { title, flag, descriptions, englishTitle, currency, currencySymbol, id, language } = req.body;

    if (title !== undefined && flag !== undefined && descriptions !== undefined && currency !== undefined && englishTitle !== undefined && currencySymbol !== undefined) {
        CountriesModel.update({
            title: title,
            descriptions: descriptions,
            englishTitle: englishTitle,
            flag: flag,
            language: language,
            currency: currency,
            currencySymbol: currencySymbol
        },
            {
                where: { id: id }
            })
            .then(() => { res.status(200).json({ success: 'Update' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(204).json({ error: 'Lack Informations' });

    }

});

router.delete('/admin/country', authAdmin, (req, res) => {
    const id = req.query['id'];

    if (id !== undefined) {
        CountriesModel.destroy({
            where: {
                id: id
            }
        })
            .then(() => { res.status(200).json({ success: 'Delete' }) })
            .catch((error) => { res.status(400).json(error) })
    }
    else {
        res.status(204).json({ error: 'Lack Informations' });
    }

});









module.exports = router