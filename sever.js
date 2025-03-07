const express = require("express");
const app = express();
const cors = require("cors");
//const authRouter = require("./routers/auth")
//const usersRouter = require("./routers/users")
const {readdirSync} = require('fs')
const bodyParser = require('body-parser')
const morgan = require("morgan")
const port = 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
readdirSync('./routers').map((c)=>app.use('/api',require('./routers/'+c)))
//app.use('/api',authRouter)
///app.use('/api',usersRouter)

app.listen(port,(req,res)=>{
    console.log("http sever run at "+port)
});

