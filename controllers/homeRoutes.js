/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Sonja Gorin, Jacob Martin, Gustavo Miller
 * Licensed under MIT
 * 
 * Group Project #2 MVC/Express.js
 * Cravings
 * 
 * Date : 11/14/2023 5:50:29 PM
 *******************************************************************/
const router = require("express").Router();
const { Users } = require("../models");
const dic = require("../db/queries"); // Collection of SQL queries

router.get('/', async (req, res) => {
     res.render('hero', {
          logged_in: req.session.logged_in,
          user_name: req.session.user_name,
     });
});

/**
 * Login route - user will be presented with login screen to 
 * enter their credentials
 */
router.get('/login', (req, res) => {
     if (req.session.logged_in) {
          res.redirect('/');
          return;
     }

     res.render('login');
});

/**
 * Register route - this will allow new users to register into our blog
 * database.
 */
router.get('/register', (req, res) => {
     if (req.session.logged_in) {
          alert(dic.messages.registernot);
          return;
     }

     res.render('register');
})

module.exports = router;
