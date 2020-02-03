const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {

    roles = roles.map(rol => rol.value)
    return (req, res, next) => {
        //get token from header if present
        const token = req.headers["x-access-token"] || req.headers["authorization"];
        // if not found, return error response
        if (!token) return res.status(401).json({message: "Acess denied. No token provided"});

        try {
            const decoded_user = jwt.verify(token, process.env.PRIVATE_KEY);
            console.log(decoded_user);
            if (roles.length && !roles.includes(decoded_user.role)){
                return res.status(401).json({message: "Unauthorized"});
            }
            req.user = decoded_user;
            next();
        } catch(ex) {
            //If invalid token
            res.status(400).send("Invalid token");
        }
    };

}
