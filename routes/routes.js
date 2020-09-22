var express = require('express')
var router = express.Router()
var model = require('../models/model.js')
var bodyParser = require('body-parser')

router.get('/', function (req, res, next) {
  res.status(400)
  next(null, req, res, next)
})

router.post('/api/v1/saveSignature', bodyParser.json(), model.saveSignature)
module.exports = router
