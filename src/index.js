const express = require('express');

const app = express();
const {PORT} = require('./config/server_config');

const prepareAndStartServer = () => {
    app.listen(PORT,()=> {
        console.log(`Server started at port : ${PORT}`);
    })
}

prepareAndStartServer();