const bcrypt = require('bcryptjs');
const { number } = require('joi');
var jwt = require('jsonwebtoken');
const { con } = require('../db');
const { VendorCreateSchema , VendorUpdateSchema} = require('../helpers/validation');
const fs = require('fs');


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
        alternate_phone,business_email, business_address} = req.body
        const {user_id} = req.user;

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const insertQuery = `INSERT INTO vendor (user_name, password, business_name, business_phone, 
         alternate_phone, business_email, business_address, created_by)
        VALUES ('${user_name}', '${hashPassword}','${business_name}','${business_phone}',
        '${alternate_phone}','${business_email}','${business_address}','${user_id}')`

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
        business_email, business_address, status, created_by, created_at, updated_by, updated_at FROM vendor`
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
        business_phone, alternate_phone, business_email, business_address, status, created_by, 
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

        const {user_name, business_name, business_phone, alternate_phone, 
            business_email, business_address} = req.body
        const {user_id} = req.user;
        
        const updateVendorQuery =  `UPDATE vendor SET 
        user_name='${user_name}',
        business_name ='${business_name}',
        business_phone ='${business_phone}', 
        alternate_phone ='${alternate_phone}',
        business_email ='${business_email}', 
        business_address ='${business_address}',
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
        // -------------------- unlink old profile start ------------------
        const vendorQuery = `select image from vendor WHERE id="${vendorID}"`;      
        con.query(vendorQuery, async (error, oldResult) => {            
            if(oldResult.length>0){              
                if(oldResult[0].image!= null)
                fs.unlinkSync(process.cwd() + oldResult[0].image);
            }
        });
        // -------------------- end ------------------
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
        const vendorLoginQuery = `select * from vendor where business_email = "${email}" `;     
        con.query(vendorLoginQuery, async (error, result) => {
            if(error){
                return res.status(500).json({"status": false, "message": error});
            }
            if(result.length > 0){
                const isCorrectPass = await bcrypt.compare(password, result[0].password); 
                if(result[0].status==0) 
                return res.status(400).json({status:false, message : "Your account is not active." });
                if(isCorrectPass){
                    delete result[0].password;
                    const token = jwt.sign({ user_id:  result[0].id }, process.env.JWT_SECRET, { expiresIn: '30d' });                   
                    return res.status(200).json({status:true, message : "Vendor Login successfully", data: result[0], token:token })
                }else{
                    return res.status(400).json({ status:false, message : "Wrong Credentials" });
                }
            }else{
                return res.status(400).json({status:false, message : "Wrong Credentials"});
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

/**
 * vendor upload profile
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const vendorUploadProfile = async (req, res) => {
    try{
        const vendorID = req.params.vendorID;       
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({"status":false, "message":"No files were uploaded." });
        }
        // -------------------- unlink old profile start ------------------
        const vendorQuery = `select image from vendor WHERE id="${vendorID}"`;      
        con.query(vendorQuery, async (error, result) => {            
            if(result.length>0){              
                if(result[0].image!= null)
                fs.unlinkSync(process.cwd() + result[0].image);
            }
        });
        // -------------------- end ------------------
        sampleFile = req.files.profile;   
        let fileName = Date.now()+sampleFile.name    
        const uploadPath =  process.cwd() +'/public/vendor_profile/' + fileName;
        const storePath = '/public/vendor_profile/' + fileName;
      
        // ----------- Use the mv() method to place the file 
        sampleFile.mv(uploadPath, function(err) {
            if (err)
            return res.status(500).json({"status": false, "message" : err});
            // -------------  Store file in database....
            const vendorProfileQuery = `UPDATE vendor SET image='${storePath}' WHERE id="${vendorID}"`;
            con.query(vendorProfileQuery, async (error, result) => {
                if(error){
                    return res.status(500).json({ "status" : false, "message" : error });
                } 
                if(result.affectedRows>0){
                    return res.status(200).json({"status": true, "message" : "File uploaded successfully!" });
                }else{
                    return res.status(400).json({"status": false,"message": "User not found."});
                }
            });  
            // ----------------------------------------------          
        });
        // --------------------------------------------------
    }catch(error){
        return res.status(500).json({"status":false,"message":error.message });
    }
}

/**
 * vendor request send
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const vendorRequest = async (req, res) => {
    try{
        const {	user_name, business_name, business_phone, business_email, business_address } = req.body;
        const insertQuery = `INSERT INTO vendor_request( user_name, business_name, business_phone,
        business_email, business_address) VALUES ('${user_name}','${business_name}','${business_phone}',
        '${business_email}','${business_address}')`;

           con.query(insertQuery, (error, result)=>{
            if(error)
                return res.status(500).json({ "status" : false, "message" : error });
            if(result.insertId > 0)
                return res.status(200).json({ status:true,  message : "Vendor request send successfully" });
           });
    }catch(error){
        return res.status(500).json({ status : false, message : error.message});
    }
}

/**
 * all vendor request
 * @param {*} req 
 * @param {*} res 
 */
const vendorAllRequest = async (req, res) => {
    try{
        const {	user_name, business_name, business_phone, business_email, business_address } = req.body;
        const selectQuery = `select * from vendor_request`;
           con.query(selectQuery, (error, result)=>{
            if(error)
                return res.status(500).json({ "status" : false, "message" : error });
            if(result.length > 0)
                return res.status(200).json({ status:true,  data : result });
            });
    }catch(error){
        return res.status(500).json({ status : false, message : error.message});
    }
}

/**
 * approve vendor request
 * @param {*} req 
 * @param {*} res 
 */
const vendorRequestApprove = async (req, res) => {
    try{
        const requestID = req.params.requestID;
        selectQuery =  `SELECT * FROM vendor_request WHERE id = ${requestID}`;
        con.query(selectQuery, async (selectError, selectResult) => {
            if(selectError) return res.status(500).json({ status: false, message: selectResult.message });
            
            if(selectResult.length>0){
                const { user_name, business_name, business_phone, 
                business_email, business_address } = selectResult[0];
                const {user_id} = req.user;
                const password = user_name.split(' ')[0]+"@123";

                const salt = bcrypt.genSaltSync(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const insertQuery = `INSERT INTO vendor (user_name, password, business_name, business_phone, 
                business_email, business_address, created_by)
                VALUES ('${user_name}', '${hashPassword}','${business_name}','${business_phone}',
                '${business_email}','${business_address}','${user_id}')`;

                con.query(insertQuery, async (error, result)=>{
                if(error)
                    return res.status(500).json({ "status" : false, "message" : error });
                if(result.insertId > 0)
                    deleteQuery = `Delete from vendor_request where id = ${requestID}`;
                    con.query(deleteQuery, async (deleteError, deleteResult) =>{
                        if(deleteResult.affectedRows>0) {
                            return res.status(200).json({ status:true,  message : "Vendor request approved successfully." });
                        }   
                    });
                });                
            }        
        });
    }catch(error){
        return res.status(500).json({ status: false, message:error.message});
    }
}

/**
 * reject vendor request
 * @param {*} req 
 * @param {*} res 
 */
const vendorRequestReject = async (req, res) => {
    try{
        const requestID = req.params.requestID;
        deleteQuery = `Delete from vendor_request where id = ${requestID}`;
        con.query(deleteQuery, async (deleteError, deleteResult) =>{
            if(deleteError)
                return res.status(500).json({ "status" : false, "message" : deleteError });
            if(deleteResult.affectedRows>0) {
                return res.status(200).json({ status:true,  message : "Vendor request reject." });
            }   
        });
    }catch(error){
        return res.status(500).json({ status: false, message:error.message});
    }
}



module.exports = { 
    getAllVendor, getVendorDetials, vendorCreate, vendorDetialsUpdate, vendorDetialsDelete,
    vendorStatusUpdate, vendorSubscription, vendorResetPassword, vendorLogin, vendorForgotPassword,
    vendorOtpVerify, vendorChangePassword, vendorUploadProfile, vendorRequest, vendorAllRequest,
    vendorRequestApprove, vendorRequestReject
}