const geoCode=require('./utils/geoCode.js')
const getForecast=require('./utils/getForecast.js')
const path=require('path');
const express=require('express')
const hbs=require('hbs');
const { query } = require('express');

const app=express()
const port=process.env.PORT || 3000
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Chethan Shetty'
    }) 
    
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Chethan Shetty'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        name:'Chethan Shetty',
        title:'Help Page'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a address!!"
        })
    }
    geoCode(req.query.address,(error,{lattitude,longitude,location} = {}) =>{
    if(error)
    {
            return res.send({
                error:"Unable to find location, try with valid location!!"
            })
    }
    getForecast(lattitude,longitude,(error,forecastData)=>{
        if(error!=undefined)
        {
            return res.send({
                error:"Unable to fetch weather. Try again!!"
            })
        }
        return res.send({
            location:location,
            ForecastData:forecastData
        })  
    })  
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return  res.send({
            error:"You must provide a search term"
        })
    
    }
    
    res.send({
        "prodcts":"No Prodcuts Available"
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"Help article not found",
        name:"Chethan Shetty"
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:"404 Page not found",
        name:"Chethan Shetty"
    })
})
app.listen(port,()=>{
    console.log("Server is up on port "+port)
})