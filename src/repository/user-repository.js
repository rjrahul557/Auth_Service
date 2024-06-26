const {User,Roles} = require('../models/index');

class UserRepository {
    async create(data) 
    {
        try{
            const user = await User.create(data);
            return user;
        }catch(error)
        {
            console.log("something went wrong in the repository layer");
            throw({error});
        }
    }
    async getById(userId)
    {
        try{
            const user = await User.findByPk(userId,{
                attributes : ['email','id']
            })
            return user;
        }catch(error){
            console.log("something went wrong in the repository layer");
            throw({error});
        }
    }

    async getByEmail(userEmail)
    {
        try{
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            })
            return user;
        }catch(error){
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }
    async destory(userId)
    {
        try{
            await User.destory({
                where : {
                    id : userId
                }
            })
        }catch(error){

        }
    }

    async isAdmin(userId){
        try{
            const user = await User.findByPk(userId);
            const adminRole = await Roles.findOne({
                where : {
                name : 'ADMIN',
            }
        })
            return user.hasRole(adminRole);
        }catch(error){
            nsole.log("something went wrong in the repository layer");
            throw error;
        }
    }
    
}

module.exports = UserRepository;