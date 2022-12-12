const express = require('express')
const { getAllUsers, createUser, loginUser, getUserDetail } = require('./controllers/userController')
const authenticateToken = require('./helpers/verifyjwt')
// const { getRegValidation } = require('./helpers/validation')

const routes = express.Router()



routes.post('/user/login', loginUser)
routes.get('/user/all', authenticateToken ,getAllUsers)
routes.post('/user/register' , createUser)
routes.get('/user/detail', authenticateToken,  getUserDetail)







module.exports = routes