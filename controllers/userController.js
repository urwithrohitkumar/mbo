const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { con } = require('../db');
const { signupSchema } = require('../helpers/validation');

/**
 *  get all users.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllUsers = async (req, res) => {
    try {
        const getAllUserQuery = `SELECT id, first_name, last_name, email, phone, status,
        created_at, updated_at, updated_by FROM user`
        con.query(getAllUserQuery, async (error, result)=>{  
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }         
            if(result.length > 0){
                res.status(200).json({ status:true, message : "User Login successfully", data: result });
            }else{
                res.status(400).json({ status:false,  message : "User Not Found" });
            }
        });       
        
    } catch (error) {
        return res.status(500).json({ status:false, message : error.message });
    }    
  }


  /**
   * create user
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  const createUser = async (req, res) => {
    try {
        const {error, value} = signupSchema.validate(req.body)
        if(error){
            return res.status(401).json({ status:false, message : error.message });
        }
        const {email, first_name, last_name, phone ,password} = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const insertQuery = `INSERT INTO user (first_name, last_name, email, password, phone)
        VALUES ('${first_name}', '${last_name}','${email}','${hashPassword}','${phone}')`

        con.query(insertQuery, (error, result)=>{
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }            
            return res.status(200).json({ status:true,  message : "User Register successfully" });
        });        
    } catch (error) {
        return res.status(500).json({ status:false, message : error.message }); 
    }    
  }

  /**
   * login user.
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const getUserQuery = `SELECT * FROM user WHERE email = '${email}'`
        con.query(getUserQuery, async (error, result)=>{    
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }                  
            if(result.length > 0){
                const isCorrectPass = await bcrypt.compare(password, result[0].password)
                if(isCorrectPass){
                    delete result[0].password;
                    const token = jwt.sign({ user_id:  result[0].id }, process.env.JWT_SECRET, { expiresIn: '30d' });
                    return res.status(200).json({status:true, message : "User Login successfully", data: result[0], token: token })
                }else{
                    return res.status(400).json({ status:false, message : "Wrong Credentials" });
                }
            }else{
                return res.status(400).json({ status:false, message : "User Not Found" });
            }
        }); 
    } catch (error) {
        return res.status(500).json({ status:false, message : error.message });
    }
  }


/**
 *  get login user detials.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
  const getUserDetail = async (req, res) => {
    try {
        const {user_id} = req.user;
        const getUserQuery = `SELECT * FROM user WHERE id = '${user_id}'`
        con.query(getUserQuery, async (error, result)=>{  
            if(error){
                return res.status(500).json({ "status" : false, "message" : error });
            }        
            if(result.length > 0){
                res.status(200).json({ status:true, message : "User Login successfully",  data: result[0]  });
            }else{
                res.status(400).json({ status:false,  message : "User Not Found" });
            }
        });        
    } catch (error) {
        return res.status(500).json({ status:false, message : error.message });
    }    
  }

  /**
   * user forget password 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  const userForgotPassword = async (req, res) => {
    try{
        const { email } = req.body;
        const getUserQuery = `SELECT * FROM user WHERE email = '${email}'`
        con.query(getUserQuery, async (err, result)=>{
            const user_id = result[0].id;
            const otp = 123456;
           // const otp = rand(100000,999999);
            const userForgotQuery = `UPDATE user SET otp='${otp}' WHERE id = ${user_id}`;
            con.query(userForgotQuery, async(error, result) => {
                if(error){
                    return res.status(500).json({ "status" : false, "message" : error });
                }
                if(result.affectedRows){
                    return res.status(200).json({"status":true, "message": "OTP send successfully"});
                }else{
                    return res.status(400).json({"status":false, "message": "OTP send unsuccessfully"});
                }
            })
        });
    }catch(error){
        return res.status(500).json({ "status":false, "message":error.message });
    }
  }

  /**
   * user OTP Verify
   * @param {*} req 
   * @param {*} res 
   */
  const userOtpVerify = async (req, res) => {
    try{
        const { email, otp } = req.body;
        const userOtpVerify = `select  id, first_name, last_name, email, phone, 
        password, otp from user where email = "${email}" and otp="${otp}"`;           
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
    } catch(error){
        return res.status(500).json({ "status": false,  "message" : error.message });
    }
  }


  /**
   * User Change Password
   * @param {*} req 
   * @param {*} res 
   */
  const userRestPassword = async (req, res) =>{
    try{
        const { email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const userRestPassword = `UPDATE user SET password='${hashPassword}' WHERE email="${email}"`;
        con.query(userRestPassword, async (error, result) => {
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
        return res.status(500).json({ "status":false,  "message": error.message });
    }
  } 



  module.exports = {
    getAllUsers, 
    createUser, 
    loginUser, 
    getUserDetail, 
    userForgotPassword, 
    userOtpVerify,
    userRestPassword
}