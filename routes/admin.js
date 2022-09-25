const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');


//get admin index
router.get('/index', function(req, res) {
    res.render('admin/admin_index', { layout: 'admin' });
});

//Login
router.get('/login', function(req, res) {
    res.render('admin/login', { layout: 'admin' });
});


//get rgister page
router.get('/register', function(req, res) {
        res.render('register', { layout: 'admin' })
    })
    //Reigster User
router.post('/register', function(req, res) {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    // validation
    req.checkBody('firstname', 'firstname is required').notEmpty();
    req.checkBody('lastname', 'lastname is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'passwords do not match').equals(req.body.password);
    // req.checkBody('phone', 'phone number must be a valid ugandan number').isMobilePhone('en-UG');

    const errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        }, { layout: 'admin' });

    } else {
        Admin.findOne({ username: username }).then(admin => {
            if (admin) {
                errors.push({ msg: 'username already taken' });
                res.render('register', {
                    errors,
                }, { layout: 'admin' });
            } else {
                const newAdmin = new Admin({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: password,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin.save()
                            .then(user => {
                                req.flash('success_msg', 'you are now registered and can login');
                                res.redirect('login');
                            });
                    });
                });
            }
        })
    }
});


passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {
    Admin.findOne({ username: username }, (err, admin) => {
        if (err) throw err;
        if (!admin) {
            return done(null, false, { message: 'Unknown User' });
        }
        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, admin);
            } else {
                return done(null, false, { message: 'Invalid Password' });
            }
        });
    });
}));
passport.serializeUser(function(Admin, done) {
    done(null, Admin.id);
});

passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
        done(err, admin);
    });
});

//  Login user
router.post('/login', passport.authenticate('local', { successRedirect: 'admin/admin_index', failureRedirect: '/login', failureFlash: true }), function(req, res) {

    res.redirect('admin/admin_index', { layout: 'admin' });

});


// login out
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

// router.get('/logout', (req, res) => {
//   req.logout();

//   res.redirect('/users/login');
// })

//tate test 



module.exports = router;