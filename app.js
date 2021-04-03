const express = require('express')
const app = express()
const fs = require('fs')
var multer  = require('multer')
const path = require('path')
// var upload = multer({ dest: './public/images/' })


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, 'public/images'));
    },
    filename: (req, file, cb) =>{
        cb(null, id() + '.jpg');
    }
});

app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(multer({ storage:storageConfig }).single("image"));


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const body = req.body.body
    const image = req.file.filename

    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err

        const blogs = JSON.parse(data)

        blogs.push({
            id: id(),
            title: title,
            author: author,
            body: body,
            image: image,
        })

        fs.writeFile('./data/blogs.json', JSON.stringify(blogs), err => {
         if (err) throw err
        })
        res.redirect('/create')
    })
})


//All Blogs

app.get('/blogs', (req, res) => {

    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err
        
        const blogs = JSON.parse(data)
        res.render('blogs', {blogs: blogs})
    })
})



//Show individual

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err
        
        const blogs = JSON.parse(data)
        const blog = blogs.filter(blog => blog.id == id)[0]
        res.render('blog', {blog: blog})
    })
})


//Delete

app.get('/blogs/:id/delete', (req, res) => {
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



//Api

app.get('/api/v1/blogs', (req, res) => {
    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err
        
        const blogs = JSON.parse(data)
        res.json(blogs)
    })
})

app.listen(5000,  err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
};
