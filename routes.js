const express = require('express')
/** * user controller  */
const { getAllUsers, createUser, loginUser, getUserDetail, userForgotPassword,
    userOtpVerify, userResetPassword } = require('./controllers/userController');

/** * Vendor controller  */
const { getAllVendor, vendorCreate, getVendorDetials, vendorDetialsUpdate,
    vendorDetialsDelete, vendorStatusUpdate, vendorSubscription, 
    vendorResetPassword, vendorLogin, vendorForgotPassword, vendorOtpVerify,
    vendorChangePassword } = require('./controllers/vendorController');

/** * Employee Controller  */
const { employeeCreate, employeeAll, getEmployee, employeeUpdate, 
    employeeDelete, employeeStatus, employeeResetPassword } = require('./controllers/employeeController');    

/** * validation helper  */
const authenticateToken = require('./helpers/verifyjwt')
const routes = express.Router()


/** * User Routes */
routes.post('/user/login', loginUser)
routes.get('/user/all', authenticateToken ,getAllUsers)
routes.post('/user/register' , createUser)
routes.get('/user/detail', authenticateToken,  getUserDetail)
routes.post('/user/forgot-password', userForgotPassword)
routes.post('/user/otp-verify', userOtpVerify)
routes.post('/user/reset-password', userResetPassword)


/** * Vendor Routes */
routes.post('/vendor/login', vendorLogin)
routes.post('/vendor/forgot-password', vendorForgotPassword)
routes.post('/vendor/otp-verify', vendorOtpVerify)
routes.post('/vendor/change-password', vendorChangePassword)
routes.get('/vendor/all', authenticateToken,  getAllVendor)
routes.get('/vendor/:vendorID', authenticateToken,  getVendorDetials)
routes.post('/vendor/create', authenticateToken,  vendorCreate)
routes.put('/vendor/update/:vendorID', authenticateToken,  vendorDetialsUpdate)
routes.put('/vendor/status/:vendorID', authenticateToken,  vendorStatusUpdate)
routes.put('/vendor/subscription/:vendorID', authenticateToken,  vendorSubscription)
routes.put('/vendor/reset-password/:vendorID', authenticateToken,  vendorResetPassword)
routes.delete('/vendor/delete/:vendorID', authenticateToken,  vendorDetialsDelete)


/** * Employee Routes */
routes.get('/employee/all', authenticateToken,  employeeAll)
routes.get('/employee/:employeeID', authenticateToken,  getEmployee)
routes.post('/employee/create', authenticateToken,  employeeCreate)
routes.put('/employee/update/:employeeID', authenticateToken,  employeeUpdate)
routes.put('/employee/status/:employeeID', authenticateToken,  employeeStatus)
routes.put('/employee/reset-password/:employeeID', authenticateToken,  employeeResetPassword)
routes.delete('/employee/delete/:employeeID', authenticateToken,  employeeDelete)

module.exports = routes