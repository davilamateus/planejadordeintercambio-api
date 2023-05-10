const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const authAdmin = require('../../Middleware/adminMiddleware');
const CitiesModel = require('../../models/cities/cities')
const CountriesModel = require('../../models/countries/countries')


// Get only one city
router.get('/city', (req, res) => {
    const id = req.query['id'];
    CitiesModel.findOne(
        {
            where: { id: id },
            include: [{ model: CountriesModel }]
        }
    )
        .then((data) => { res.status(200).json(data) })
        .catch((error) => { res.status(400).json(error) });

});


// Get List of Countries and Cities
router.get('/cities', (req, res) => {
    CitiesModel.findAll(
        {
            include: [{ model: CountriesModel }]
        }
    )
        .then((data) => { res.status(200).json(data) })
        .catch((error) => { res.status(400).json(error) });
});

// Add Cities
router.post('/admin/city', authAdmin, (req, res) => {
    const { title, airport, descriptions, englishTitle, img, countryId } = req.body;
    if (title !== undefined && airport !== undefined && descriptions !== undefined && img !== undefined && englishTitle !== undefined && countryId !== undefined) {
        CitiesModel.create({
            title: title,
            englishTitle: englishTitle,
            descriptions: descriptions,
            countryId: countryId,
            airport: airport,
            img: img
        })
            .then(() => { res.json({ success: 'City Add' }) })
            .catch((error) => { res.status(400).json(error) });
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});

// Edit a City
router.patch('/admin/city', authAdmin, (req, res) => {
    const user = req.user;
    const { title, airport, descriptions, englishTitle, img, countryId, id } = req.body;

    if (title !== undefined && airport !== undefined && descriptions !== undefined && img !== undefined && englishTitle !== undefined && countryId !== undefined && id !== undefined) {
        CitiesModel.update({
            title: title,
            englishTitle: englishTitle,
            descriptions: descriptions,
            countryId: countryId,
            airport: airport,
            countryId: countryId,
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

// Delete a City

router.delete('/admin/city', authAdmin, (req, res) => {
    const id = req.query['id'];

    if (id !== undefined) {
        CitiesModel.destroy({
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









module.exports = router