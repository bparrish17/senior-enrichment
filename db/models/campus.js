'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgURL: Sequelize.TEXT
})

module.exports = Campus;