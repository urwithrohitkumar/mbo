const jwt = require('jsonwebtoken');

async function authenticateVendorToken(req, res, next){
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]           
        if (token == null) return res.status(401).json({ status:false, message : "Vendor not verified" });
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
            if (err) return res.status(403).json({ status:false, message : err.message });      
            req.user = decoded      
            next()
        });

    } catch (error) {
        res.status(403).json({ status:false, message : error.message });
    }
}

module.exports = authenticateVendorToken