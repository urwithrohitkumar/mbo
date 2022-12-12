const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { con } = require('../db');
const { signupSchema } = require('../helpers/validation');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */


const getAllUsers = async (req, res) => {
    try {
        const getAllUserQuery = `SELECT id, first_name, last_name, email, phone, status,
        created_at, updated_at, updated_by FROM user`

        con.query(getAllUserQuery, async (err, result)=>{          
            if(result.length > 0){
                res.status(200).json({
                    status:true,
                    message : "User Login successfully",
                    data: result,

                })
            }else{
                res.status(400).json({
                    status:false,
                    message : "User Not Found"
                })
            }
        })       
        
    } catch (error) {
        return res.status(500).json({
            status:false,
            message : error.message
        })
    }
    
  }


  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */


const createUser = async (req, res) => {
    try {
        const {error, value} = signupSchema.validate(req.body)
        if(error){
            return res.status(401).json({
                status:false,
                message : error.message
            })
        }

        const {email, first_name, last_name, phone ,password} = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const insertQuery = `INSERT INTO user (first_name, last_name, email, password, phone)
        VALUES ('${first_name}', '${last_name}','${email}','${hashPassword}','${phone}')`

        con.query(insertQuery, (err, result)=>{
                res.status(200).json({
                    status:true,
                    message : "User Register successfully"
                })
        })

        
    } catch (error) {
        return res.status(500).json({
            status:false,
            message : error.message
        })
    }
    
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */


  const loginUser = async (req, res) => {
    try {

        const {error, value} = loginSchema.validate(req.body)
        if(error){
            return res.status(401).json({
                status:false,
                message : error.message
            })
        }

        const {email, password} = req.body
        const getUserQuery = `SELECT * FROM user WHERE email = '${email}'`
        con.query(getUserQuery, async (err, result)=>{                    
            if(result.length > 0){
                const isCorrectPass = await bcrypt.compare(password, result[0].password)
                if(isCorrectPass){
                    delete result[0].password;
                    const token = jwt.sign({ user_id:  result[0].id }, process.env.JWT_SECRET, { expiresIn: '30d' });
                    res.status(200).json({
                        status:true,
                        message : "User Login successfully",
                        data: result[0],
                        token: token
                    })
                }else{
                    res.status(400).json({
                        status:false,
                        message : "Wrong Credentials"
                    })
                }
            }else{
                res.status(400).json({
                    status:false,
                    message : "User Not Found"
                })
            }
        })        
        
    } catch (error) {
        return res.status(500).json({
            status:false,
            message : error.message
        })
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
        con.query(getUserQuery, async (err, result)=>{          
            if(result.length > 0){
                    res.status(200).json({
                        status:true,
                        message : "User Login successfully",
                        data: result[0],

                    })
            }else{
                res.status(400).json({
                    status:false,
                    message : "User Not Found"
                })
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            status:false,
            message : error.message
        })
    }
    
  }

  module.exports = {getAllUsers, createUser, loginUser, getUserDetail}