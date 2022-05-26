const createHttpError = require("http-errors");
const { verifyToken } = require("../services/authService");

 function jwtAuth(req, res, next) {
    try {
        let decodedData = jwtToken(req, res, next);
        req.jwtData = decodedData;
        next();
    } catch (error) {
        next(createHttpError(403, "Invalid token."));
    }
}

 function jwtToken(req, res, next) {
    let token = req.headers["authorization"];
    if (!token) {
        next(createHttpError(401));
        return;
    }
    token = token.slice(7, token.length);
    return verifyToken(token);
}

module.exports = {
    jwtAuth,
    jwtToken   
}