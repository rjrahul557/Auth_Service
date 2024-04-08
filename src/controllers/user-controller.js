const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req,res) => {
    try{
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        })

        return res.status(200).json({
            data : response,
            success : true,
            message : "successfully created a user",
            err : {}
        })
    }catch(error){
        return res.status(500).json({
            data : {},
            success : false,
            message : "attempt to create a user failed",
            err : {}
        }) 
    }
}

module.exports = {
    create,
}