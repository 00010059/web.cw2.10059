const express = require('express')
const router = express.Router()

const fs = require('fs')


router.get('/', (req, res) => {

    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err
        
        const blogs = JSON.parse(data)
        res.render('blogs', {blogs: blogs})
    })
})

module.exports = router