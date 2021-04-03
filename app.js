const express = require('express')
const app = express()
const fs = require('fs')


app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})



app.listen(5000,  err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
})
