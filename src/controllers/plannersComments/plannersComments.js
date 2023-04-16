
const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const plannersComments = require('../../models/plannersComments/plannersComments');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


//Add Planner
router.post('/planners/comments', auth, (req, res) => {

    const { content, plannerId } = req.body;

    if (content !== undefined && plannerId !== undefined) {
        plannersComments.create({
            plannerId: plannerId,
            content: content,
            userId: req.user.id
        })
            .then((data) => { res.status(201).json(data) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


//Update Planner
router.patch('/planners/comments', auth, (req, res) => {

    const { content, plannerId, id } = req.body;

    if (content !== undefined && plannerId !== undefined && id !== undefined) {
        plannersComments.update({
            content: content,
            plannerId: plannerId,
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
router.delete('/planners/comments', auth, (req, res) => {

    const id = req.query['id'];

    if (id !== undefined) {
        plannersComments.destroy(
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

router.get('/planners/comments', auth, (req, res) => {

    plannersComments.findAll({
        where: { userId: req.user.id }
    }).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(400).json(error)
    });

});




module.exports = router
