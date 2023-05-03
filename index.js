const express = require('express')
const exphbs = require('express-handlebars')
const axios = require('axios')

const app = express()

// URLS
// MAKEUP http://makeup-api.herokuapp.com/api/v1/products.json

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async (req,res)=>{

    await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json')
    .then(data=>{
        
        const randomizedItems = data.data.sort(()=>Math.random()-0.5)
        const items = randomizedItems.splice(0,15)

        res.render('products/home', {items})
    })
    .catch(err=>console.log(err))

})


app.listen(3000)