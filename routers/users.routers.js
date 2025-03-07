const express = require("express")
const router = express.Router()
const {update,remove,list} = require("../controllers/user.controller");
const {authmid} = require('../middleware/auth.middleware')


router.get('/users',authmid,list)
router.put('/users/:userId',authmid,update)
router.delete('/users/:userId',authmid,remove)

module.exports = router