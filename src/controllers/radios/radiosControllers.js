const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const authAdmin = require('../../Middleware/adminMiddleware');
const RadiosModel = require('../../models/radios/radios');
const CountriesModel = require('../../models/countries/countries');




// Get only one Radio
router.get('/radio', (req, res) => {
    const id = req.query['id'];
    RadiosModel.findOne(
        {
            where: { id: id },
            include: [{ model: CountriesModel }]
        }
    )
        .then((data) => { res.status(200).json(data) })
        .catch((error) => { res.status(400).json(error) });

});

// Get List of Radios
router.get('/radios', (req, res) => {

    const countryId = req.query['countryId'];

    if (countryId !== undefined) {
        RadiosModel.findAll(
            {
                include: [{ model: CountriesModel }],
                where: { countryId: countryId },
            }
        )
            .then((data) => { res.status(200).json(data) })
            .catch((error) => { res.status(400).json(error) });
    } else {
        RadiosModel.findAll({
            include: [{ model: CountriesModel }],

        })
            .then((data) => { res.status(200).json(data) })
            .catch((error) => { res.status(400).json(error) });
    }

});

// Add Radio
router.post('/admin/radio', authAdmin, (req, res) => {
    const { title, link, img, countryId } = req.body;
    if (title !== undefined && img !== undefined && countryId !== undefined) {
        RadiosModel.create({
            title: title,
            link: link,
            img: img,
            countryId: countryId
        })
            .then(() => { res.json({ success: ' Add Success' }) })
            .catch((error) => { res.status(400).json(error) });
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});

// Edit a Radio
router.patch('/admin/radio', authAdmin, (req, res) => {
    const { title, link, img, countryId, id } = req.body;

    if (title !== undefined && img !== undefined && countryId !== undefined && id !== undefined) {
        RadiosModel.update({
            title: title,
            link: link,
            img: img,
            countryId: countryId
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

// Delete a radio

router.delete('/admin/radio', authAdmin, (req, res) => {
    const id = req.query['id'];

    if (id !== undefined) {
        RadiosModel.destroy({
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