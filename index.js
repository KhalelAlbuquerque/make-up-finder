const express = require('express')
const exphbs = require('express-handlebars')
const axios = require('axios')

const app = express()

// URLS
// MAKEUP http://makeup-api.herokuapp.com/api/v1/products.json

app.engine('handlebars', exphbs.engine())
app.set('handlebars', 'handlebars')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async (req,res)=>{

    await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json')
    .then(data=>{
        console.log(data.data.length)
    })

})





app.listen(3000)