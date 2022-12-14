const bcrypt = require('bcryptjs');
const { number } = require('joi');
var jwt = require('jsonwebtoken');
const { con } = require('../db');
const { VendorCreateSchema , VendorUpdateSchema} = require('../helpers/validation');

  /**
   * create vendor
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
const vendorCreate = async (req, res) => {
    try {
        const {error, value} = VendorCreateSchema.validate(req.body)
        if(error){
            return res.status(401).json({ status:false, message : error.message });
        }

        const {user_name, password, business_name, business_phone,
        alternate_phone,business_email} = req.body
        const {user_id} = req.user;

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const insertQuery = `INSERT INTO vendor (user_name, password, business_name, business_phone, 
         alternate_phone, business_email, created_by)
        VALUES ('${user_name}', '${hashPassword}','${business_name}','${business_phone}',
        '${alternate_phone}','${business_email}','${user_id}')`

        con.query(insertQuery, (error, result)=>{
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }               
            if(result.insertId >0){
                return res.status(200).json({ status:true,  message : "Vendor Created successfully" });
            } 
        })        
    } catch (error) {
        return res.status(500).json({ status:false, message : error.message });
    }    
  }

  /**
   * Get All Vendors
   * @param {*} req 
   * @param {*} res 
   */
const getAllVendor = async ( req, res) => {
    try{
        const getAllVendorQuery = `SELECT id, user_name, business_name, business_phone, alternate_phone,
        business_email, status, created_by, created_at, updated_by, updated_at FROM vendor`
         con.query(getAllVendorQuery, async (error, result)=>{       
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }     
            if(result.length > 0){
                return res.status(200).json({ status:true,  data: result });
            }else{
                return res.status(400).json({ status:false,  message : "Vendor Not Found" });
            }
        })      
    }catch (error){
        return res.status(500).json({  status:false, message : error.message });
    }
}

/**
 * get vendor detials using id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getVendorDetials = async (req, res) => {    
    try{
        const vendorID = Number(req.params.vendorID); 
        const getVendorQuery = `SELECT id, user_name, business_name, 
        business_phone, alternate_phone, business_email, status, created_by, 
        created_at, updated_by, updated_at FROM vendor WHERE id = '${vendorID}'`

        con.query(getVendorQuery, async (error, result)=>{ 
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            } 
            if(result.length > 0){
                res.status(200).json({ status:true,  data: result });
            }else{
                res.status(400).json({status:false, message : "Vendor Not Found" });
            }
        })
    }catch(error){
        return res.status(500).json({  status: false, message: error.message });
    }
}


/**
 * Update vendor using id
 * @param {*} req 
 * @param {*} res 
 */
const vendorDetialsUpdate = async (req, res) => {

    try {  
        const vendorID = req.params.vendorID;      
        const {error, value} = VendorUpdateSchema.validate(req.body);
        if(error)
        return res.status(401).json({ "status":false,"message": error.message });

        const {user_name, business_name, business_phone, alternate_phone, business_email} = req.body
        const {user_id} = req.user;
        
        const updateVendorQuery =  `UPDATE vendor SET 
        user_name='${user_name}',
        business_name ='${business_name}',
        business_phone ='${business_phone}', 
        alternate_phone ='${alternate_phone}',
        business_email ='${business_email}', 
        updated_by ='${user_id}' 
        WHERE  id = ${vendorID}`
       
        con.query(updateVendorQuery, async (error, result) => {
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            } 
            if(result.affectedRows){
                return res.status(200).json({"status":true, "message": "Vendor detials update successfully"});
            }else{
                return res.status(400).json({"status":false, "message": "Vendor detials update unsuccessfully"});
            }
        });

    } catch(error) {
        return res.status(500).json({ "status":false, "message": error.message });
    }
}


/**
 * vendor detials deleted 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const vendorDetialsDelete = async (req, res) => {
    try{
        const vendorID = req.params.vendorID;
        const deleteVendorQuery = ` DELETE FROM vendor WHERE id = ${vendorID}`;
        con.query(deleteVendorQuery, async (error, result) => {   
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }         
            if(result.affectedRows){
                return res.status(200).json({"status":true, "message": "Vendor delete successfully"});
            }else{
                return res.status(400).json({"status":false, "message": "Vendor delete unsuccessfully"});
            }
        });
    }catch (error){
        return res.status(500).json({"status":false, "message": error.message});
    }
}

/**
 * Update Vendor status
 * @param {*} req 
 * @param {*} res 
 */
const vendorStatusUpdate =  async (req, res) => {
    try{
        const vendorID = req.params.vendorID;
        const {status} = req.body
        const vendorStatusQuery = `UPDATE vendor SET status='${status}' WHERE id = ${vendorID}`;
        con.query(vendorStatusQuery, async(error, result) => {
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            } 
            if(result.affectedRows){
                return res.status(200).json({"status":true, "message": "Vendor status update successfully"});
            }else{
                return res.status(400).json({"status":false, "message": "Vendor status update unsuccessfully"});
            }
        })
    }catch(error){
        return res.status(500).json({ "status":false, "message": error.message });
    }
}

/**
 * update vendor subscrition
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const vendorSubscription = async (req, res) => {
    try{
        const vendorID = req.params.vendorID;
        const {start_date, end_date} = req.body
        const vendorStatusQuery = `UPDATE vendor SET start_date='${start_date}',end_date ='${end_date}' WHERE id = ${vendorID}`;
        con.query(vendorStatusQuery, async(error, result) => {
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }
            if(result.affectedRows){                              
                return res.status(200).json({"status":true, "message": "Vendor subscription update successfully"});
            }else{
                return res.status(400).json({"status":false, "message": "Vendor subscription update unsuccessfully"});
            }
        })
    }catch(error){
        return res.status(500).json({ "status":false,  "message": error.message  });
    }
}

/**
 * reset vender password.
 * @param {*} req 
 * @param {*} res 
 */
const vendorResetPassword = async (req, res) => {
    try{    
        const vendorID = req.params.vendorID;
        const {password} = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const vendorStatusQuery = `UPDATE vendor SET password='${hashPassword}' WHERE id = ${vendorID}`;
        con.query(vendorStatusQuery, async (error, result) => {
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }
            if(result.affectedRows){
                return res.status(200).json({"status":true, "message": "Vendor password update successfully"});
            }else{
                return res.status(400).json({"status":false, "message": "Vendor password update unsuccessfully"});
            }
        })
    }catch(error){
        return res.status(500).json({ "status":false,  "message":error.message });
    }
}

/**
 * Vendor Login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const vendorLogin = async (req, res) => {
    try {   
        const { email, password } = req.body;
        const vendorLoginQuery = `select * from vendor where business_email = "${email}"`;     
        con.query(vendorLoginQuery, async (error, result) => {
            if(error){
                return res.status(500).json({"status": false, "message": error});
            }
            if(result.length > 0){
                const isCorrectPass = await bcrypt.compare(password, result[0].password)
                if(isCorrectPass){
                    delete result[0].password;                   
                    return res.status(200).json({status:true, message : "Vendor Login successfully", data: result[0] })
                }else{
                    return res.status(400).json({ status:false, message : "Wrong Credentials" });
                }
            }
        });
    }catch (error){
        return res.status(500).json({"status": 500, "message": error,message });
    }
}

/**
 * vendor Forgot Password
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const vendorForgotPassword = async (req, res) => {
    try{
        const { email } = req.body;
        const vendorForgotQuery = `select * from vendor where business_email = "${email}"`;
        con.query(vendorForgotQuery, async(error, result) => {
            if(error){
                return res.status(500).json({ "status": false, "message": error });
            }
            if(result.length > 0){
                const user_id = result[0].id;
                const otp = 123456;
                // const otp = rand(100000,999999);
                const userForgotQuery = `UPDATE vendor SET otp='${otp}' WHERE id = ${user_id}`;
                con.query(userForgotQuery, async(error, resultUpdate) => {
                    if(error){
                        return res.status(500).json({ "status" : false, "message" : error });
                    }
                    if(resultUpdate.affectedRows){
                        return res.status(200).json({"status":true, "message": "OTP send successfully"});
                    }else{
                        return res.status(400).json({"status":false, "message": "OTP send unsuccessfully"});
                    }
                });
            }
        });
    }catch(error){
        return res.status(500).json({"status": false, "message": error.message});
    }
}

/**
 * vendor otp verify
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const vendorOtpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const userOtpVerify = `select  id, user_name, otp, business_email  
        from vendor where business_email = "${email}" and otp="${otp}"`;  
        con.query(userOtpVerify, async (error, result) => {
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }
            if(result.length>0){
                return res.status(200).json({ "status" : true, "message" : "OTP verify successfull." });
            }else{
                return res.status(400).json({ "status" : false, "message" : "OTP verify unsuccessfull." });
            }
        });
    }catch(error){
        return res.status(500).json({"status": false, "message": error.message});
    }
}

/**
 * vendor change password
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const vendorChangePassword = async (req, res) => {
    try{
        const { email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const vendorChangePassQuery = `UPDATE vendor SET password='${hashPassword}' WHERE business_email="${email}"`;
        con.query(vendorChangePassQuery, async (error, result) => {
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            } 
            if(result.affectedRows>0){
                return res.status(200).json({"status": true, "message": "Password change successfully."});
            }else{
                return res.status(400).json({"status": false,"message": "Password Change unsuccessfully."});
            }
        });
    }catch(error){
        return res.status(500).json({"status":false, "message":error.message});
    }
}


module.exports = { 
    getAllVendor, 
    getVendorDetials,
    vendorCreate,    
    vendorDetialsUpdate,
    vendorDetialsDelete,
    vendorStatusUpdate,
    vendorSubscription,
    vendorResetPassword,
    vendorLogin,
    vendorForgotPassword,
    vendorOtpVerify,
    vendorChangePassword
}