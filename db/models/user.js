'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: Sequelize.STRING,
  campus: Sequelize.STRING
})

const Campus = db.define('campus', {
  name: Sequelize.STRING,
  imgURL: Sequelize.TEXT,
  students: Sequelize.ARRAY(Sequelize.STRING) 
})


User.belongsTo(Campus, { as: 'student'})

module.exports = {
  User: User, 
  Campus: Campus
}

