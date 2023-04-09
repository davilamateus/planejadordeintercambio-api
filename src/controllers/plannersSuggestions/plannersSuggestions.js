
const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const plannersSuggestions = require('../../models/plannersSuggestions/plannersSuggestions');
const Sequelize = require('sequelize');
const authAdmin = require('../../Middleware/adminMiddleware');
const planners = require('../../models/planners/planners');
const plannersAttachments = require('../../models/plannersAttachments/plannersAttachments');
const plannersComments = require('../../models/plannersComments/plannersComments');
const plannersSteps = require('../../models/plannersSteps/plannersSteps');
const Op = Sequelize.Op;


//Add Planner Suggestions

router.post('/admin/plannerssuggestions', authAdmin, (req, res) => {

    const { countryId, plannerId } = req.body;

    if (countryId !== undefined && plannerId !== undefined) {
        plannersSuggestions.create({
            countryId: countryId,
            plannerId: plannerId,
        })
            .then(() => { res.status(201).json({ success: 'Add' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


//Update Planner Suggestions
router.patch('/admin/plannerssuggestions', authAdmin, (req, res) => {

    const { countryId, plannerId, id } = req.body;

    if (countryId !== undefined && plannerId !== undefined && id !== undefined) {
        plannersSuggestions.update({
            countryId: countryId,
            plannerId: plannerId,
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

//Delete Planner Suggestions
router.delete('/admin/plannerssuggestions', authAdmin, (req, res) => {

    const id = req.query['id'];

    if (id !== undefined) {
        plannersSuggestions.destroy(
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



// Get list of planners Suggestions

router.get('/plannerssuggestions', auth, (req, res) => {
    const countryId = req.query['countryId'];


    if (countryId !== undefined) {
        let listSuggestions = [];
        plannersSuggestions.findAll({
            where: { countryId: countryId },
        }).then((data) => {

            if (data !== null) {

                let resultIds = [];

                data.map((item) => {
                    resultIds.push(item.id);
                })

                planners.findAll()


            } else {
                res.status(404).json({ error: 'Empty' })

            }

            res.status(200).json(data)
        }).catch((error) => {
            res.status(400).json(error)
        });
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});




module.exports = router
