const express = require('express')
const Users = require('../models/usersModel.js')

const { validateUserData, validateUser, validateUserId } = require('../util')

const router = express.Router()

router.post('/signup', validateUserData, async (req, res) => {
    const newUser = req.validInput
    try {
        const user = await Users.insert(newUser)
        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            }
        })
    } catch (error) {
        if(error.errno === 19) {
            res.status(405).json(error)
        } else {
            res.status(500).json(error)
        }
    }
})

router.post('/login', validateUser, async (req, res) => {
    try {
        console.log(res.body)
        res.status(200).json({
            message: `Welcome ${req.validUser.email}`,
            user: req.validUser
        })
    } catch (error) {
        console.log("error")
        res.status(500).json({
            message: "Error"
        })
    }
})

router.put('/:id', validateUserId, validateUserData, async (req, res) => {
    try {
        const updatedUser = await Users.update(req.validUser.id, req.validInput)
        res.status(201).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const deletedUser = await Users.remove(req.validUser.id)
        res.status(200).json(deletedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router