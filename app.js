const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/applot')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//routing
const index = require('./routes/index')

app.use('/', index)


//listen
app.listen(process.env.PORT || 3000, () => {
  console.log('running...');
})
