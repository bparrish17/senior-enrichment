'use strict'
const api = require('express').Router()
const db = require('../db')
const models = require('../db/models')
const User = models.User;
const Campus = models.Campus;



// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

//STUDENTS

api.get('/students', function(req, res, next) {
    User.findAll({})
    .then(user => res.json(user))
    .catch(next)
})

api.get('/students/:studentId', function(req, res, next) {
    var id = req.params.studentId
    User.findById(id)
    .then(user => res.json(user))
    .catch(next)
})

api.put('/students/:studentId', function(req, res, next) {
    var id = req.params.studentId;
    User.findById(id)
    .then(student => {return student.update(req.body)})
    .then(response => res.json(response))
    .catch(next);
})

api.post('/students', function(req, res, next) {
    let name = req.body.name;
    let email = req.body.email;
    let campusId = req.body.campusId;
    User.create({name, email, campusId})
    .then(user => res.json(user))
    .catch(next)
})

api.delete('/students/:studentId', function(req, res, next) {
    let id = req.params.studentId;
    User.destroy({where: {id}})
    .then(() => res.status(204).end())
    .catch(next);
})


//CAMPUSES

api.get('/campuses', function(req, res, next) {
    Campus.findAll({})
    .then(campus => res.json(campus))
    .catch(next)
})

api.get('/campuses/:campusId', function(req, res, next) {
    var id = req.params.campusId
    Campus.findById(id)
    .then(campus => res.json(campus))
    .catch(next)
})

api.post('/campuses', function(req, res, next) {
    let name = req.body.name;
    let imgURL = req.body.imgURL;
    Campus.create({name, imgURL})
    .then(campus => res.json(campus))
    .catch(next)
})

api.put('/campuses/:campusId', function(req, res, next) {
    var id = req.params.campusId;
    Campus.findById(id)
    .then(campus => {return campus.update(req.body) })
    .then(response => res.json(response))
    .catch(next);
})

api.delete('/campuses/:campusId', function(req, res, next) {
    let id = req.params.campusId;
    Campus.destroy({where: {id}})
    .then(() => res.status(204).end())
    .catch(next);
})

module.exports = api