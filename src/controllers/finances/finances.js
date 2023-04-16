
const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const financeModel = require('./../../models/finances/finances');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const userOptions = require('../../models/userOptions/userOptions');


//Add Finance
router.post('/finance', auth, (req, res) => {

    const { title, category, value, date } = req.body;

    if (title !== undefined && category !== undefined && value !== undefined && date !== undefined) {
        financeModel.create({
            title: title,
            category: category,
            value: value,
            date: date,
            userId: req.user.id
        })
            .then(() => { res.status(201).json({ success: 'Add' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


//Update Finance
router.patch('/finance', auth, (req, res) => {

    const { title, category, value, date, id } = req.body;

    if (title !== undefined && category !== undefined && value !== undefined && date !== undefined && id !== undefined) {
        financeModel.update({
            title: title,
            category: category,
            value: value,
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

//Delete Finance
router.delete('/finance', auth, (req, res) => {

    const id = req.query['id'];

    if (id !== undefined) {
        financeModel.destroy(
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



// Get list of Finances

router.get('/finances', auth, (req, res) => {
    const order = req.query['order'] || 'DESC';
    const orderBy = req.query['order_by'] || 'createdAt';




    let coursersValue = 0
    let coursersPorcents = 0

    let documentsValue = 0;
    let documentsPorcents = 0;


    let heathValue = 0;
    let heathPorcents = 0;


    let othersValue = 0;
    let othersPorcents = 0;


    let totalSpentValue = 0
    let totalSpentPorcents = 0

    let bugdetTotal = 0



    userOptions.findOne({ where: { userId: req.user.id } })
        .then((data) => {
            bugdetTotal = Number(data.budget)


            financeModel.findAll({
                where: { userId: req.user.id }, order: [[orderBy, order]],
            })
                .then((data) => {
                    data.map((item) => {
                        totalSpentValue = totalSpentValue + Number(item.value)
                        totalSpentPorcents = (totalSpentValue * 100) / bugdetTotal
                    })


                    data.map((item) => {
                        if (item.category === 1) {
                            coursersValue = coursersValue + Number(item.value)
                        } else if (item.category === 2) {
                            documentsValue = documentsValue + Number(item.value)
                        } else if (item.category === 3) {
                            heathValue = heathValue + Number(item.value)
                        } else if (item.category === 4) {
                            othersValue = othersValue + Number(item.value)
                        }
                    })


                    coursersPorcents = (coursersValue * 100) / bugdetTotal
                    console.log(totalSpentValue)
                    documentsPorcents = (documentsValue * 100) / bugdetTotal
                    heathPorcents = (heathValue * 100) / bugdetTotal
                    othersPorcents = (othersValue * 100) / bugdetTotal

                    const dataRes = {
                        list:
                            data
                        ,
                        porcents: {
                            courses: coursersPorcents,
                            documents: documentsPorcents,
                            heath: heathPorcents,
                            others: othersPorcents,
                            total: totalSpentPorcents
                        },
                        totalValue: {
                            courses: coursersValue,
                            documents: documentsValue,
                            heath: heathValue,
                            others: othersValue,
                            total: totalSpentValue,
                            budget: bugdetTotal,
                            lessToBudget: (totalSpentValue - bugdetTotal) * (-1)
                        }
                    }

                    res.json(dataRes).status(200)

                })
        })
        .catch((error) => { res.status(400).json(error) })

});




module.exports = router
