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
    .then(result=>{
        // THE API HAS BROKEN IMAGES, AND IT BRAKES THE HTML,
        // IF IT DOESNT HAVE THIS PROBLEM, THE CODE WOULD BE

        // let randomizedItems = result.data.sort(()=>Math.random()-0.5)
        // randomizedItems = randomizedItems.filter(element=>element.image_link!=null&&element.price!=0.0)
        // const items = randomizedItems.splice(0,15) take only 15 first

        // And thats how the code goes, taking fix 15 products
        // that doesnt have broken images to show on home

        notFreeItems = result.data.filter(element=>element.price!=0.0)

        const shownItems = [
            notFreeItems[31], notFreeItems[41], notFreeItems[51],
            notFreeItems[40], notFreeItems[50], notFreeItems[60],
            notFreeItems[70], notFreeItems[80], notFreeItems[90],
            notFreeItems[100], notFreeItems[110], notFreeItems[120],
            notFreeItems[130], notFreeItems[140], notFreeItems[150], 
        ]


        
        res.render('products/home', {items:shownItems})
    })
    .catch(err=>console.log(err.message))

})


app.listen(3000)