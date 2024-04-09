const validateUserAuth = (req,res,next) =>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data : {},
            success : false,
            message : 'somethinf went wrong',
            err  : 'email or password is missing'
        })
    }
    next();
}

module.exports = {
    validateUserAuth,
}