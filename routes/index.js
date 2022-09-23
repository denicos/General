var express = require('express');
var router = express.Router();
const Agent = require('../models/Agent');

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
router.get('/clearing', function(req, res) {
    res.render('clearing_agents', { layout: 'general' });
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

module.exports = router;