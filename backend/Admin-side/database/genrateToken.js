const jwt = require("jsonwebtoken")

const genrateToken = (id) => {
    let token = jwt.sign({ id }, process.env.JWT_SECRET , {
        // HOW MUCH TIME DOES TAKE TO TOKEN IS EXPIRED
        expiresIn:"30d"
    })
    // console.log("token: ", token)
    return token
} 

module.exports = genrateToken