const express = require('express')

const router = express.Router()
const restrictedMiddleware = require('../util/restrictedMiddleware.js')

router.get('/', restrictedMiddleware, async (req, res) => {
    try {
        res.status(200).json({
            message: "Restricted accessed"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router