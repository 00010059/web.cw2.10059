const express = require('express')
const router = express.Router()

const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err

        const id = req.params.id
        
        const blogs = JSON.parse(data)
        const blog = blogs.findIndex((e) => e.id == id)
        blogs.splice(blog, 1)

        fs.writeFile('./data/blogs.json', JSON.stringify(blogs), err => {
            if (err) throw err
            res.redirect('/blogs?deleted=success')
        })
    })
})

module.exports = router