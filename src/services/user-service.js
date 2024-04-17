const UserRepository = require('../repository/user-repository');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/server_config.js');
class UserService {
    constructor()
    {
        this.userRepository = new UserRepository();
    }


    async create(data)
    {
        try{
            const user = await this.userRepository.create(data);
            return user;

        }catch(error){
            console.log("somethinf went wrong in the service layer");
            throw({error});
        }
    }


    async signIn(email,plainPassword)
    {
        try{
            //step 1->get the user by email
            const user = await this.userRepository.getByEmail(email);
            //step2-> compare incoming password with encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;

        }catch(error){
            console.log("something went wrong in the signIn process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try{
            const response = this.verifyToken(token);
            if(!response){
                throw {error : 'Invalid token'};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error : 'no user with corresponding token exist'};
            }
            return user.id;
        }catch(error){
            console.log('something went wrong in the authentication of token');
            throw error;
        }
    }


    createToken(user)
    {
        try{
            const token = jwt.sign(user,JWT_KEY,{expiresIn : '1h'});
            return token;
        }catch(error){
            console.log("something went wrong in the token creation");
            throw({error});
        }
    }

    verifyToken(token)
    {
        try{
            const response = jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){
            console.log("something went wrong in the token verification");
            throw({error});
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword)
    {
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        }catch(error){
            console.log("something went wrong with the password comparison");
            throw({error});
        }
    }

    isAdmin(userId){
        try{
            return this.userRepository.isAdmin(userId);
        }catch(error){
            onsole.log("something went wrong in the service layer");
            throw({error});
        }
    }
}

module.exports = UserService;