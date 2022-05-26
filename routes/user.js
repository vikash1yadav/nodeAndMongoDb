const router = require("express").Router();
const User = require("../models/User");
const { generateToken } = require("../services/authService");
const { jwtAuth } = require("../middleware/index");

router.get("/user-token", async function (req, res, next) {
    const { username, password } = req.query;
    User.findOne({ username }).then((user) => {
        console.log(user);
        if (user.password === password) {
            const token = generateToken(username);
            res.status(200).send({
                token: token,
                userDetails: user,
            })
        } else {
            res.status(401).send({ message: "Invalid credentials" })
        }        
    }).catch(next)
    
})

router.get("/user-all", jwtAuth, function (req, res, next) {
    User.find().then((result) => {
        res.status(200).send(result)
    }).catch(next)
})

router.post("/add-user", async function (req, res) {
    console.log("req", req.body);
try {
    const newUser = new User(req.body);
    const data = await newUser.save();
    res.status(200).send(data);
} catch (error) {
    res.status(400).send(error)

}
})

module.exports = router;
