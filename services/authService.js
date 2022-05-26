const jwt = require("jsonwebtoken")

function generateToken(email, id) {
	return jwt.sign({ email, id }, process.env.JWT_SECRET, {
		expiresIn: 86400,
	});
}

 function verifyToken(token) {
	 return jwt.verify(token, process.env.JWT_SECRET, {
		complete: true,
	});
}
module.exports = { generateToken, verifyToken }