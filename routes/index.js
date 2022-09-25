var express = require('express');
var router = express.Router();
const Agent = require('../models/Agent');
const Exporter = require('../models/Exporter')
const Inspector = require('../models/Inspector');
const Product = require('../models/Product');
const Space = require('../models/Space')

//Get Homepage
router.get('/', function(req, res) {
    res.render('index');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}


//Get clearing agent view
router.get('/clearing', async(req, res) => {
    try {
        const agents = await Agent.find({ agent_type: 'clearing' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('clearing_agents', { layout: 'general', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//@desc process add clearing agent form
//@route post /clearing
router.post('/clearing', async(req, res) => {
    try {
        await Agent.create(req.body)
        res.redirect('/clearing')
    } catch (err) {
        console.error(err)
        res.render('errors/500 ')

    }
})


//process flight agents
//Get clearing agent view
router.get('/flight', async(req, res) => {
    try {
        const agents = await Agent.find({ agent_type: 'flight' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('flight_agent', { layout: 'general', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//@desc process add flight agent form
//@route post /flight
router.post('/flight', async(req, res) => {
    try {
        await Agent.create(req.body)
        res.redirect('/flight')
    } catch (err) {
        console.error(err)
        res.render('errors/500 ')

    }
})

//single agent view.

router.get('/contact/:id', async(req, res) => {
    const agent = await Agent.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!agent) {
        return res.render('errors/404')
    } else {
        res.render('full_agent_info', { layout: 'general', agent })
    }
})

//get exporter page..
router.get('/exporter', async(req, res) => {
    try {
        const exporters = await Exporter.find({ status: 'unapproved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('exporters', { layout: 'general', exporters })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//@route post /exporter
router.post('/exporter', async(req, res) => {
        try {
            await Exporter.create(req.body)
            res.redirect('/exporter')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single exporter
router.get('/exporter/:id', async(req, res) => {
    const exporter = await Exporter.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!exporter) {
        return res.render('errors/404')
    } else {
        res.render('view_exporter', { layout: 'general', exporter })
    }
})

//get inspector page
router.get('/inspector', async(req, res) => {
    try {
        const inspectors = await Inspector.find({ status: 'unapproved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('inspector', { layout: 'general', inspectors })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});
//@route post /inspector
router.post('/inspector', async(req, res) => {
        try {
            await Inspector.create(req.body)
            res.redirect('/inspector')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single inspector
router.get('/inspector/:id', async(req, res) => {
    const inspector = await Inspector.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!inspector) {
        return res.render('errors/404')
    } else {
        res.render('view_inspector', { layout: 'general', inspector })
    }
})

//quantity less by
router.get('/less', async(req, res) => {
    try {
        const products = await Product.find({ quantity_type: 'less' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('less', { layout: 'general', products })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});
//@route post /less
router.post('/less', async(req, res) => {
        try {
            await Product.create(req.body)
            res.redirect('/less')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single  less
router.get('/less/:id', async(req, res) => {
    const les = await Product.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!les) {
        return res.render('errors/404')
    } else {
        res.render('view_less', { layout: 'general', les })
    }
})

//quantity excess by
router.get('/excess', async(req, res) => {
    try {
        const productz = await Product.find({ quantity_type: 'excess' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('excess', { layout: 'general', productz })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});
//@route post /excess
router.post('/excess', async(req, res) => {
        try {
            await Product.create(req.body)
            res.redirect('/excess')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single  excess
router.get('/excess/:id', async(req, res) => {
    const excess = await Product.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!excess) {
        return res.render('errors/404')
    } else {
        res.render('view_excess', { layout: 'general', excess })
    }
})

//space with AWB
router.get('/space', async(req, res) => {
    try {
        const spaces = await Space.find({ status: 'unapproved' })
            .populate("country")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('space', { layout: 'general', spaces })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});
//@route post /space
router.post('/space', async(req, res) => {
        try {
            await Space.create(req.body)
            res.redirect('/space')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single  space
router.get('/space/:id', async(req, res) => {
    const spaces = await Space.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!spaces) {
        return res.render('errors/404')
    } else {
        res.render('view_space', { layout: 'general', spaces })
    }
})

module.exports = router;