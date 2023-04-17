
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

    const { title, category, descriptions, date } = req.body;

    if (title !== undefined && category !== undefined && descriptions !== undefined && date !== undefined) {
        plannerModel.create({
            title: title,
            category: category,
            descriptions: descriptions,
            status: 1,
            date: date,
            position: 0,
            userId: req.user.id
        })
            .then((data) => { res.status(200).json(data) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


//Update Planner
router.patch('/planners', auth, (req, res) => {

    const { title, category, descriptions, id, date } = req.body;

    console.log(title, category, descriptions, id, date)
    if (title !== undefined && category !== undefined && descriptions !== undefined && date !== undefined) {
        plannerModel.update({
            title: title,
            category: category,
            descriptions: descriptions,
            date: date
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


router.patch('/planner/status/', auth, (req, res) => {
    const user = req.user;


    plannerModel.update({
        status: req.body.status,
        position: req.body.position,

    }, {
        where: { [Op.and]: [{ id: req.body.id }, { userID: user.id }], }
    }).then(() => { res.status(200).json({ sucess: 'Update' }) }).catch((error) => { res.status(400).json(error) })
});



// Get list of planners

router.get('/planners', auth, (req, res) => {

    plannerModel.findAll({
        where: { userId: req.user.id },
        order: [
            ['position', 'ASC'], ['updatedAt', 'DESC'],
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
        let in_progressCount = 0
        let in_progressList = []
        let openCount = 0
        let openList = []
        let doneCount = 0
        let doneList = []


        data.map((item) => {
            if (item.status == 2) {
                in_progressCount++
                in_progressList.push(item)
            } else if (item.status == 1) {
                openCount++
                openList.push(item)
            } else if (item.status == 3) {
                doneCount++
                doneList.push(item)
            }


        })
        res.json({ list: { in_progress: in_progressList, open: openList, done: doneList }, counts: { in_progress: in_progressCount, open: openCount, done: doneCount } })
    }).catch((error) => { res.status(400).json(error) })


});







module.exports = router
