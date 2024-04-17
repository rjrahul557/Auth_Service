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
            err : error
        }) 
    }
}

const signin = async(req,res) => {
    try{
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data : response,
            success : true,
            message : "successfully signed in",
            err : {}

        })
    }catch(error){
        return res.status(500).json({
            data : {},
            success : false,
            message : "something went wrong",
            err : error
        }) 
    }
}

const isAuthenticated = async(req,res) => {
    try{
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data : response,
            err:{},
            message :'user is authenticated and token is valid',
            success : true
        })
    }catch(error)
    {
        return res.status(500).json({
            data : {},
            success : false,
            message : "something went wrong in token vf",
            err : error
        }) 
    }
}

const isAdmin = async(req,res)=>{
    try{

        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: 'Successfully fetched whether user is admin or not'
        })

    }catch(error){
        return res.status(500).json({
            data : {},
            success : false,
            message : "something went wrong",
            err : error
        }) 
    }
}
module.exports = {
    create,
    signin,
    isAuthenticated,
    isAdmin,
}