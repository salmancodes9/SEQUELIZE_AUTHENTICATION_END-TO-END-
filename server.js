const db = require('./config/db')
const sequelize = require('sequelize')

const app = require('./app')
app.listen(5000, ()=>console.log("server running"))