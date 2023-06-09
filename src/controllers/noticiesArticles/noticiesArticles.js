const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/userMiddleware');
const authAdmin = require('../../Middleware/adminMiddleware');
const NoticiesCategoryModel = require('../../models/noticiesCategories/noticiesCategories');
const NoticiesArticleModel = require('../../models/noticies/noticies');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const path = require('path')
const uuid = require('uuid')
const multer = require('multer')





// Add Article

router.post('/admin/noticies', authAdmin, (req, res) => {
    const { noticiesCategoryId, title, descriptions, img, countryId } = req.body;


    if (noticiesCategoryId !== undefined && title !== undefined && descriptions !== undefined && img !== undefined && countryId !== undefined) {
        NoticiesArticleModel.create({
            noticiesCategoryId: noticiesCategoryId,
            title: title,
            descriptions: descriptions,
            img: img,
            countryId: countryId,
            userId: req.user.id
        })
            .then(() => { res.status(201).json({ success: 'Add' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
})


// Edit Article

router.patch('/admin/noticies', authAdmin, (req, res) => {
    const { noticiesCategoryId, title, descriptions, img, countryId, id } = req.body;


    if (noticiesCategoryId !== undefined && title !== undefined && descriptions !== undefined && img !== undefined && countryId !== undefined) {
        NoticiesArticleModel.update({
            noticiesCategoryId: noticiesCategoryId,
            title: title,
            descriptions: descriptions,
            img: img,
            countryId: countryId,

        }
            ,
            { where: { id: id } }
        )
            .then(() => { res.status(201).json({ success: 'Update' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
});


// Delete Article

router.delete('/admin/noticies', authAdmin, (req, res) => {
    const id = req.query['id'];


    if (id !== undefined) {
        NoticiesArticleModel.destroy(
            { where: { id: id } }
        )
            .then(() => { res.status(201).json({ success: 'Delete' }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }
});




// Get a Article

router.get('/noticie', auth, (req, res) => {
    const id = req.query['id'];
    if (id !== undefined) {

        NoticiesArticleModel.findOne({
            where: { id: id },
            include: [{ model: NoticiesCategoryModel }]
        })
            .then((data) => {
                if (data !== null) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json({ atention: 'Empty' })
                }
            })

    } else {
        res.status(400).json({ error: 'Lack Informations' })
    }

});

// Article List
router.get('/notices', auth, (req, res) => {
    const search = req.query['search'] || '';
    const country = req.query['country'];
    const order = req.query['order'] || 'DESC';
    const orderBy = req.query['orderBy'] || 'createdAt';
    const page = req.query['page'] || 1;
    const category = req.query['category'];
    const perPage = Number(req.query['perPage']) || 7;



    let noticiteCategoryAlReady = {}
    console.log(country, category)

    if (category !== undefined && category !== undefined) {
        console.log('aquiiiii*****')
        noticiteCategoryAlReady = { countryId: country }, { noticiesCategoryId: category }
    } else {
        noticiteCategoryAlReady = { countryId: country }
    }

    NoticiesArticleModel.findAll({
        where: {
            [Op.or]: [{ title: { [Op.like]: `%${search}%` }, }, { descriptions: { [Op.like]: `%${search}%` }, },],
            [Op.and]: [noticiteCategoryAlReady],

        },
        include: [{ model: NoticiesCategoryModel }],
        limit: [((page - 1) * perPage), perPage],
        order: [[orderBy, order]],

    })
        .then((data) => {
            NoticiesArticleModel.count(
                {
                    where: {
                        [Op.or]: [{ title: { [Op.like]: `%${search}%` }, }, { descriptions: { [Op.like]: `%${search}%` }, },],
                        [Op.and]: [noticiteCategoryAlReady],
                    },

                    order: [[orderBy, order]]
                }

            ).then((count) => {
                res.status(200).json([data, { count: count }])
            })
        })
        .catch((error) => { res.status(400).json(error) });
});



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + './../../../public/img/noticies')
    },
    filename: function (req, file, cb) {
        const namePhoto = uuid.v4() + Date.now() + '.png'
        cb(null, namePhoto)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);

        callback(null, true)
    },
    onFileUploadStart: function (file) {
    },
});

router.post('/noticies/img', upload.single('file'), function (req, res, next) {
    const result = req.file
    res.status(200).json(result)
    return false;
})








module.exports = router