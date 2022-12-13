const express = require('express')
/**  * user controller  */
const { getAllUsers, createUser, loginUser, getUserDetail, userForgotPassword,
     userOtpVerify, userRestPassword } = require('./controllers/userController')
/**  * Vendor controller  */
const { getAllVendor, vendorCreate, getVendorDetials, vendorDetialsUpdate,
    vendorDetialsDelete, vendorStatusUpdate, vendorSubscription, 
    vendorResetPassword, vendorLogin, vendorForgotPassword , vendorOtpVerify,
    vendorChangePassword } = require('./controllers/vendorController')
/**  * validation helper  */
const authenticateToken = require('./helpers/verifyjwt')
const routes = express.Router()


/**
 * User Routes
 */
routes.post('/user/login', loginUser)
routes.get('/user/all', authenticateToken ,getAllUsers)
routes.post('/user/register' , createUser)
routes.get('/user/detail', authenticateToken,  getUserDetail)
routes.post('/user/forgot-password', userForgotPassword)
routes.post('/user/otp-verify', userOtpVerify)
routes.post('/user/reset-password', userRestPassword)

/**
 * Vendor Routes
 */
routes.get('/vendor/all', authenticateToken,  getAllVendor)
routes.get('/vendor/:vendorID', authenticateToken,  getVendorDetials)
routes.post('/vendor/create', authenticateToken,  vendorCreate)
routes.put('/vendor/update/:vendorID', authenticateToken,  vendorDetialsUpdate)
routes.delete('/vendor/delete/:vendorID', authenticateToken,  vendorDetialsDelete)
routes.put('/vendor/status/:vendorID', authenticateToken,  vendorStatusUpdate)
routes.put('/vendor/subscription/:vendorID', authenticateToken,  vendorSubscription)
routes.put('/vendor/reset-password/:vendorID', authenticateToken,  vendorResetPassword)
routes.post('/vendor/login', vendorLogin)
routes.post('/vendor/forgot-password', vendorForgotPassword)
routes.post('/vendor/otp-verify', vendorOtpVerify)
routes.post('/vendor/change-password', vendorChangePassword)

module.exports = routes