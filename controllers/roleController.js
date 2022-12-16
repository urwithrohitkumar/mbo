const { con } = require('../db');

/**
 * all role
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const allRole = async (req, res) =>{
    try{
        const selectQuery = `SELECT * FROM roles WHERE status=1`;
        con.query(selectQuery ,(err, result) => {
            if(err) return res.status(500).json({ status:false, message:err.message });
            if(result.length > 0){
                return res.status(200).json({ status:true, data:result });
            }
        });
    }catch(error){
        return res.status(500).json({ status:false, message:error.message});
    }
}


/**
 * role created 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const roleCreate = async (req, res) => {
    try{    
        const { role } = req.body;
        const insertQuery = `INSERT INTO roles  (role) VALUES ('${role}')`;
        con.query(insertQuery, (err, result) => {
            if(err) return res.status(500).json({staus:false, message:err.message});
            if(result.affectedRows > 0){
                return res.status(200).json({status:true, message:"Role added successfully"});
            }
        });
    }catch(error){
        return res.status(500).json({ status:false, "message":error.message});
    }
} 


/**
 * get single role
 * @param {*} req 
 * @param {*} res 
 */
const getRole = async (req, res) => {
    try{          
        const roleID = req.params.roleID;         
        const selectQuery = `SELECT * FROM roles WHERE status = 1 AND id=${roleID}`;
        con.query(selectQuery ,(err, result) => {
            if(err) return res.status(500).json({ status:false, message:err.message });
            if(result.length > 0){
                return res.status(200).json({ status:true, data:result });
            }
        });
    }catch(error){
        return res.status(500).json({ status:false,message:error.message });
    }
}

/**
 * role update
 * @param {*} req 
 * @param {*} res 
 */
const roleUpdate = async (req,res)=>{
    try{    
        const roleID = req.params.roleID; 
        const { role } = req.body; 
        const updateQuery = `UPDATE roles SET role='${role}' WHERE id= ${roleID}`; 
        con.query(updateQuery, (err, result) => {
            if(err) return res.status(500).json({ status:500, message:err});
            if(result.affectedRows > 0 ){
                res.status(200).json({ status:200, message:"Role update successfully" });
            }
        });        
    }catch(error){
        return res.status(500).json({status:false, message:error.message});
    }
}

/**
 * role delete 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const roleDelete = async (req, res) => {
    try{
        const roleID = req.params.roleID; 
        deleteQuery = `DELETE FROM roles WHERE id=${roleID}`;
        con.query(deleteQuery, (err, result) => {
            if(err) return res.status(500).json({ status:500, message:err });
            if(result.affectedRows > 0)
            return res.status(200).json({status:200, message:"Role delete successfully"});
        });
    }catch(error){
        return res.status(500).json({status:false, message:error.message});
    }
}   




module.exports = { allRole, getRole, roleCreate, roleUpdate, roleDelete }