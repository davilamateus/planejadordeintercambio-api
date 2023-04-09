const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const authAdmin = require('../../Middleware/adminMiddleware');
const NoticiesCategoryModel = require('../../models/noticiesCategories/noticiesCategories')





// List Noticies Category
router.get('/noticies/categories', (req, res) => {
    NoticiesCategoryModel.findAll({
    })
        .then((data) => { res.status(200).json(data) })
        .catch((error) => { res.status(400).json(error) })
})

// Add Noticies Category
router.post('/admin/noticies/category', authAdmin, (req, res) => {
    const { title } = req.body;
    if (title !== undefined) {
        NoticiesCategoryModel.create({
            title: title
        })
            .then(() => { res.status(201).json({ success: 'Add' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
})

// Update Noticies Category
router.patch('/admin/noticies/category', authAdmin, (req, res) => {
    const { title, id } = req.body;
    if (title !== undefined && id !== undefined) {
        NoticiesCategoryModel.update(
            {
                title: title
            },
            {

                where: { id: id }
            })
            .then(() => { res.status(201).json({ success: ' Update' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
})


// Delete Noticies Category
router.delete('/admin/noticies/category', authAdmin, (req, res) => {
    const id = req.query['id'];
    if (id !== undefined) {
        NoticiesCategoryModel.destroy({
            where: { id: id }
        })
            .then(() => { res.status(201).json({ success: ' Delete' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
})












module.exports = router