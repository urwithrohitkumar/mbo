const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { con } = require('../db');
const { employeeSchema } = require('../helpers/validation');

/**
 * employee created 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const employeeCreate = async (req, res)=>{
     try{           
        const {validationError, value} = employeeSchema.validate(req.body);    
        if(validationError){
            return res.status(500).json({"status": false, "message": error});
        }
        const {name, password, role_id} = req.body;
        const {user_id} = req.user;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const insertQuery = `INSERT INTO employee (name, password, role_id,created_by)
        VALUES ('${name}', '${hashPassword}','${role_id}','${user_id}')`;

        con.query(insertQuery, (error, result)=>{
            if(error){
                    return res.status(500).json({ "status" : false, "message" : error });
            }               
            if(result.insertId >0){
                return res.status(200).json({ status:true,  message : "Employee Created successfully" });
            } 
        });

     }catch(error){
            return res.status(500).json({ "status":false, "message":error});
     }
}

/**
 * list of all employee
 * @param {*} req 
 * @param {*} res 
 */
const employeeAll = async (req, res )=>{
    try{
        const getAllEmployee = `SELECT employee.id, employee.name, employee.role_id,
         employee.status, employee.created_by, employee.created_at,employee.updated_by, 
         employee.updated_at, roles.role 
         FROM employee
         LEFT JOIN roles ON employee.role_id = roles.id;`;

        con.query(getAllEmployee, async(error,result)=> {
            if(error) return res.status(500).json({"status":false, "message":error});
            if(result.length>0 ){
                return res.status(200).json({"status": true, "data":result});
            }else{
                return res.status(400).json({"status" : false, "message" : "No Employee Found."});
            }
        });
    }catch(error){
        return res.status(500).json({"status":false, "message":error});
    }
}

/**
 * get employee using id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getEmployee = async (req, res) => {
    try{    
        const employeeID = Number(req.params.employeeID); 
        const getEmployee = `SELECT employee.id, employee.name, employee.role_id,
         employee.status, employee.created_by, employee.created_at,employee.updated_by, 
         employee.updated_at, roles.role 
         FROM employee
         LEFT JOIN roles ON employee.role_id = roles.id
         WHERE employee.id = ${employeeID};`;

        con.query(getEmployee, async(error,result)=> {
            if(error) return res.status(500).json({"status":false, "message":error});
            if(result.length>0 ){
                return res.status(200).json({"status": true, "data":result});
            }else{
                return res.status(400).json({"status" : false, "message" : "No Employee Found."});
            }
        });
    }catch(error){
        return res.status(500).json({"status":false, "message":error});
    }
}


/**
 * employee update
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const employeeUpdate = async (req, res) => {
    try{    
        const {validationError, value} = employeeSchema.validate(req.body);    
        if(validationError){
            return res.status(500).json({"status": false, "message": error});
        }        
        const employeeID = Number(req.params.employeeID); 
        const {name, role_id} = req.body;
        const {user_id} = req.user;

        const updateEmployee = `UPDATE employee SET name='${name}', role_id='${role_id}',
        updated_by='${user_id}' WHERE id= ${employeeID}`;
        con.query(updateEmployee, async(error,result)=> {
            if(error) return res.status(500).json({"status":false, "message":error});
            if(result.affectedRows>0 ){
                return res.status(200).json({"status": true, "message":"Employee update successfully"});
            }else{
                return res.status(400).json({"status" : false, "message" : "No Employee Found."});
            }
        });
    }catch(error){
        return res.status(500).json({"status":false, "message":error});
    }
}

/**
 * Employee delete
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const employeeDelete = async (req, res) => {
    try{
        const employeeID = Number(req.params.employeeID); 
        const deleteEmployeeQuery = `DELETE FROM employee WHERE id = ${employeeID}; `;

        con.query(deleteEmployeeQuery, async(error,result)=> {
            if(error) return res.status(500).json({"status":false, "message":error});
            if(result.affectedRows>0 ){
                return res.status(200).json({"status": true, "message":"Employee record deleted successfully."});
            }else{
                return res.status(400).json({"status" : false, "message" : "No Employee Found."});
            }
        });
    }catch(error){
        return res.status(500).json({"status":false, "message":error});
    }
}

/**
 * employee status
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const employeeStatus = async (req, res) => {
    try{    
        const {validationError, value} = employeeSchema.validate(req.body);    
        if(validationError){
            return res.status(500).json({"status": false, "message": error});
        }        
        const employeeID = Number(req.params.employeeID); 
        const {status} = req.body;   

        const updateEmployee = `UPDATE employee SET status='${status}' WHERE id= ${employeeID}`;
        con.query(updateEmployee, async(error,result)=> {
            if(error) return res.status(500).json({"status":false, "message":error});
            if(result.affectedRows>0 ){
                return res.status(200).json({"status": true, "message":"Employee status update successfully"});
            }else{
                return res.status(400).json({"status" : false, "message" : "No Employee Found."});
            }
        });
    }catch(error){
        return res.status(500).json({"status":false, "message":error});
    }
}


/**
 * employee password reset
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const employeeResetPassword = async (req, res) => {
    try{
        const employeeID = req.params.employeeID;
        const {password} = req.body;   
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const employeeStatusQuery = `UPDATE employee SET password='${hashPassword}'
        WHERE id= ${employeeID}`;
        con.query(employeeStatusQuery , async(error, result) => {
            if(error) 
            return res.status(500).json({"status":false, "message":error});
            if(result.affectedRows>0)
            return res.status(200).json({"status":true, "message":"Password updated successfully."});
        });
    }catch(error){
        return res.status(500).json({ "status" : false, "message" : error.message });
    }
}



module.exports = {
    employeeAll, getEmployee, employeeCreate, employeeUpdate, employeeDelete, employeeStatus,
    employeeResetPassword
}