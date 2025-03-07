const express = require("express")
const router = express.Router()
const {update,remove,list} = require("../controllers/user")

router.get('/users',list)
router.put('/users/:userId',update)
router.delete('/users/:userId',remove)

module.exports = router