const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://applot:applot@applot-shard-00-00-00cap.mongodb.net:27017,applot-shard-00-01-00cap.mongodb.net:27017,applot-shard-00-02-00cap.mongodb.net:27017/test?ssl=true&replicaSet=applot-shard-0&authSource=admin')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//routing
const index = require('./routes/index')
const storage = require('./routes/storage')

app.use('/', index)
app.use('/storage', storage)


//listen
app.listen(process.env.PORT || 3000, () => {
  console.log('running...');
})
