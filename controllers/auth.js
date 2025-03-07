const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


exports.register = async(req,res)=>{

    try {
        const {email,password} = req.body
    if (!email) {
        return res.status(400).json({
            message: 'invalid email'
        })
    }
    if (!password) {
        return res.status(400).json({
            message: 'invalid password'
        })
    }

    const checkUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if (checkUser) {
        return res.status(409).json({
            message:'email already exits'
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const userData = {
        email: email,
        password:hashPassword
    }
    const newUser = await prisma.user.create({
        data:userData,
        
    })
    
    
    res.json({
        message: "Register success"
    })
    } catch (err) {
        console.log(err)
        res.send("sever error").status(500)
    }
    
}

exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body
        if (!email) {
            return res.status(400).json({message:"email is required"})
        }
        if (!password) {
            return res.status(400).json({message:"password is required"})
        }
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if (!user) {
            return res.status(400).json({message:"invalid credential"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(400).json({
                message:"password is wrong"
            })
        }
        const payload = {
            user:{
                id:user.id,
                email:user.email,
                role:user.role,
            },
        }
        const token = jwt.sign(payload,'secret',{
            expiresIn:'1d'
        })
        res.send(token)
    } catch (err) {
        res.json({message: "sever error"}).status(500)
    }
    
}