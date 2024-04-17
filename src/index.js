const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index');
const db  = require('./models/index');


const app = express();
const {PORT} = require('./config/server_config');


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api' , apiRoutes);


    app.listen(PORT,async()=> {
        console.log(`Server started at port : ${PORT}`);

        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
        
        
    })
}

prepareAndStartServer();