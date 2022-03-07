const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const mongoose = require('mongoose')
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  if (req.session.currentUser) {
    res.json({currentUser: req.session.currentUser})
  } else {
    res.json('no current user')
  }


})

sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.json('Internal Server Error')
    } else if (!foundUser) {
      res.json('Username not found')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.json(req.session.currentUser)
      } else {
        res.json('Incorrect Password')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.json('session destroyed')
  })
})

module.exports = sessions
