
const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const plannersAttachments = require('../../models/plannersAttachments/plannersAttachments');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')


//Add Planners Attachments
router.post('/planners/attachments', auth, (req, res) => {

    const { title, plannerId, link } = req.body;

    if (title !== undefined && plannerId !== undefined && link !== undefined) {
        plannersAttachments.create({
            title: title,
            plannerId: plannerId,
            link: link,
            userId: req.user.id
        })
            .then((data) => { res.status(201).json(data) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});


//Update Planners Attachments
router.patch('/planners/attachments', auth, (req, res) => {

    const { title, plannerId, link, id } = req.body;

    if (title !== undefined && plannerId !== undefined && link !== undefined && id !== undefined) {
        plannersAttachments.update({
            title: title,
            plannerId: plannerId,
            link: link,
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
router.delete('/planners/attachments', auth, (req, res) => {

    const id = req.query['id'];

    if (id !== undefined) {
        plannersAttachments.destroy(
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

router.get('/planners/attachments', auth, (req, res) => {

    plannersAttachments.findAll({
        where: { userId: req.user.id }
    }).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(400).json(error)
    });

});




var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        return cb(null, __dirname + './../../../public/attachment/planners');

    },
    filename: function (req, file, cb) {

        const nameAttachment = uuid.v4() + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
        cb(null, nameAttachment)

    }
})

var upload = multer({

    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'application/pdf' || file.mimetype == 'application/doc') {
            callback(null, true)
        } else {
            callback(null, false)
        }
    },
});

router.post('/planners/attachment/file', upload.single('file'), auth, (req, res) => {
    const result = req.file
    const title = req.body.title
    if (result) {
        res.status(200).json(result)

    } else {
        res.status(400).json('Error')
    }
})

module.exports = router
