'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: Sequelize.STRING
})

module.exports = User;

