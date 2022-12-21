const express = require('express')
/** * user controller  */
const { getAllUsers, createUser, loginUser, getUserDetail, userForgotPassword, userOtpVerify, 
    userResetPassword, userUploadProfile, userDetailsUpdate } = require('./controllers/userController');

/** * Vendor controller  */
const { getAllVendor, vendorCreate, getVendorDetials, vendorDetialsUpdate, vendorDetialsDelete,
    vendorStatusUpdate, vendorSubscription, vendorResetPassword, vendorLogin, vendorForgotPassword, 
    vendorOtpVerify, vendorChangePassword, vendorUploadProfile, vendorRequest, vendorAllRequest,
    vendorRequestApprove, vendorRequestReject } = require('./controllers/vendorController');

/** * Employee Controller  */
const { employeeCreate, employeeAll, getEmployee, employeeUpdate, employeeDelete, employeeStatus, 
    employeeResetPassword } = require('./controllers/employeeController');    

const { allRole, roleCreate, getRole, roleUpdate, roleDelete }  = require('./controllers/roleController');

/** * validation helper  */
const authenticateToken = require('./helpers/verifyjwt')
const authenticateVendorToken = require('./helpers/verifyVenderjwt')
const routes = express.Router()


/** * User Routes */
routes.post('/user/login', loginUser)
routes.get('/user/all', authenticateToken ,getAllUsers)
routes.post('/user/register' , createUser)
routes.get('/user/detail', authenticateToken,  getUserDetail)
routes.post('/user/forgot-password', userForgotPassword)
routes.post('/user/otp-verify', userOtpVerify)
routes.post('/user/reset-password', userResetPassword)
routes.post('/user/upload-profile/:userID',authenticateToken, userUploadProfile)
routes.put('/user/update/:userID',authenticateToken, userDetailsUpdate)


/** * Vendor Routes */
// ----- vendor routes for vendor ------
routes.post('/vendor/login', vendorLogin)
routes.post('/vendor/forgot-password', vendorForgotPassword)
routes.post('/vendor/otp-verify', vendorOtpVerify)
routes.post('/vendor/change-password', vendorChangePassword)
routes.post('/vendor/request', vendorRequest)
routes.post('/vendor/upload-profile/:vendorID', authenticateVendorToken, vendorUploadProfile)
routes.put('/vendor/details-update/:vendorID', authenticateVendorToken, vendorDetialsUpdate)

// ----- vendor routes for admin ------
routes.get('/vendor/all', authenticateToken,  getAllVendor)
routes.get('/vendor/:vendorID', authenticateToken,  getVendorDetials)
routes.post('/vendor/create', authenticateToken,  vendorCreate)
routes.put('/vendor/update/:vendorID', authenticateToken,  vendorDetialsUpdate)
routes.put('/vendor/status/:vendorID', authenticateToken,  vendorStatusUpdate)
routes.put('/vendor/subscription/:vendorID', authenticateToken,  vendorSubscription)
routes.put('/vendor/reset-password/:vendorID', authenticateToken,  vendorResetPassword)
routes.delete('/vendor/delete/:vendorID', authenticateToken,  vendorDetialsDelete)
routes.get('/vendor/all/request', authenticateToken, vendorAllRequest)
routes.get('/vendor/request-approve/:requestID', authenticateToken, vendorRequestApprove)
routes.get('/vendor/request-reject/:requestID', authenticateToken, vendorRequestReject)


/** * Employee Routes */    
routes.get('/employee/all', authenticateToken,  employeeAll)
routes.get('/employee/:employeeID', authenticateToken,  getEmployee)
routes.post('/employee/create', authenticateToken,  employeeCreate)
routes.put('/employee/update/:employeeID', authenticateToken,  employeeUpdate)
routes.put('/employee/status/:employeeID', authenticateToken,  employeeStatus)
routes.put('/employee/reset-password/:employeeID', authenticateToken,  employeeResetPassword)
routes.delete('/employee/delete/:employeeID', authenticateToken,  employeeDelete)


/** Roles Routes */
routes.get('/role/all', authenticateToken,  allRole)
routes.get('/role/:roleID', authenticateToken,  getRole)
routes.post('/role/create', authenticateToken,  roleCreate)
routes.put('/role/update/:roleID', authenticateToken,  roleUpdate)
routes.delete('/role/delete/:roleID', authenticateToken,  roleDelete)




module.exports = routes