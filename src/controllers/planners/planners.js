
const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const plannerModel = require('../../models/planners/planners');
const plannersAttachments = require('../../models/plannersAttachments/plannersAttachments');
const plannersComments = require('../../models/plannersComments/plannersComments');
const plannersSteps = require('../../models/plannersSteps/plannersSteps');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//Add Planner
router.post('/planners', auth, (req, res) => {

    const { title, category, descriptions, status } = req.body;

    if (title !== undefined && category !== undefined && descriptions !== undefined && status !== undefined) {
        plannerModel.create({
            title: title,
            category: category,
            descriptions: descriptions,
            status: status,
            position: 0,
            userId: req.user.id
        })
            .then(() => { res.status(201).json({ success: 'Add' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


//Update Planner
router.patch('/planners', auth, (req, res) => {

    const { title, category, descriptions, status, id, position } = req.body;

    if (title !== undefined && category !== undefined && status !== undefined && descriptions !== undefined && position !== undefined) {
        plannerModel.update({
            title: title,
            category: category,
            descriptions: descriptions,
            status: status,
            position: position
        },
            {
                where: {
                    [Op.or]: [{ userId: req.user.id },],
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

//Delete Planner
router.delete('/planners', auth, (req, res) => {

    const id = req.query['id'];

    if (id !== undefined) {
        plannerModel.destroy(
            {
                where: {
                    [Op.or]: [{ userId: req.user.id },],
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



// Get list of planners

router.get('/planners', auth, (req, res) => {

    plannerModel.findAll({
        where: { userId: req.user.id },
        order: [
            ['updatedAt', 'ASC'], ['position', 'ASC'],
            [{ model: plannersAttachments }, 'id', 'ASC'],
            [{ model: plannersComments }, 'id', 'ASC'],
            [{ model: plannersSteps }, 'id', 'ASC']
        ],

        include: [
            { model: plannersAttachments, },
            { model: plannersComments },
            { model: plannersSteps }
        ]
    }).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(400).json(error)
    });

});




module.exports = router
