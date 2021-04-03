const express = require('express')
const app = express()
const fs = require('fs')
var multer  = require('multer')
var upload = multer({ dest: './public/images/' })

app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', upload.single('image'), (req, res) => {
    const image = req.file
    const title = req.body.title
    const author = req.body.author
    const body = req.body.body

    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err

        const blogs = JSON.parse(data)

        blogs.push({
            id: id(),
            image: image,
            title: title,
            author: author,
            body: body,
        })

        fs.writeFile('./data/blogs.json', JSON.stringify(blogs), err => {
         if (err) throw err
        })
        res.redirect('/create')
    })
})


app.listen(5000,  err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
};
