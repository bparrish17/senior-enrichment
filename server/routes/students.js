'use strict';

const express = require('express');
const router = express.Router();
const models = require('.../db/models');
const User = models.User;

module.exports = router;

router.get('/students', function(req, res, next) {
    User.findAll({where: req.query})
    .then(users => res.json(users))
    .catch(next)
})

router.get('/students/:studentId', function(req, res, next) {
    User.findAll({where: { studentId: req.params.studentId}})
    .then(user => res.json(user))
    .catch(next)
})

router.post('/students', function(req, res, next) {
    User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.delete('/students/:studentId', function(req, res, next) {
    // req.user.destroy()
})