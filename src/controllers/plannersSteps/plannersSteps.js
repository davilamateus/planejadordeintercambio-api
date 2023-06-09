
const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const plannersSteps = require('../../models/plannersSteps/plannersSteps');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


//Add Planner Steps
router.post('/planners/steps', auth, (req, res) => {

    const { title, plannerId } = req.body;

    if (title !== undefined && plannerId !== undefined) {
        plannersSteps.create({
            title: title,
            plannerId: plannerId,
            status: true,
            userId: req.user.id
        })
            .then((data) => { res.status(201).json(data) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


//Update Planner Steps
router.patch('/planners/steps', auth, (req, res) => {

    const { id, status } = req.body;

    if (id !== undefined && status !== undefined) {
        plannersSteps.update({
            status: status,
        },
            {
                where: {
                    [Op.or]: [{ userId: req.user.id },],
                    [Op.and]: [{ id: id }]
                }
            }
        )
            .then(() => { res.status(200).json({ success: 'Update' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
});

//Delete Planner Steps
router.delete('/planners/steps', auth, (req, res) => {

    const id = req.query['id'];

    if (id !== undefined) {
        plannersSteps.destroy(
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



// Get list of planners Steps

router.get('/planners/steps', auth, (req, res) => {

    plannersSteps.findAll({
        where: { userId: req.user.id }
    }).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(400).json(error)
    });

});




module.exports = router
