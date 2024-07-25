const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views customized location // If its not named as templates or any customized name then no need to app.set because default is used views but in our case we named it as templates.
app.set('view engine', 'hbs')//handlebars npm package but we used hbs from npmjs because its for express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve //If your html files are in public folder but for dynamics config i converted them with index.hbs and deleted the html from public document
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather Test",
        name: 'Created by Arsalan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Created by Arsalan",
        title: "About"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some help text",
        name: "Created by Arsalan"
    })
})

app.get('/help/*', (req, res) => {
    res.send("Help article not found")
})


// app.get('', (req, res) => {
//     //
//     res.send('<h1>Weather</h1>')

// })

// app.get('/help', (req,res) => {
//     res.send({
//         name: "Arsalan",
//         age: 24
//     })
// })

// app.get('/about', (req,res) => {
//     res.send("<h1>About Weather</h1>")
// })

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.send([{
            error: "You must provide a address to search"
        }])
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        //
        if(error)
        {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, response) => {
            if (error)
            {
                return res.send({error})
            }

            res.send([{
                forecast: 'The temperature is '+response.temperature+'degrees and it feels like '+response.feelslike+'degrees and the chance of rain is '+response.rainchance+'%',
                location,
                address: req.query.address
            }])
        })
    })
    // res.send([{
    //     forecast: 'Its sunny',
    //     location: 'Riyadh',
    //     address: req.query.address
    // }])
})


app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send([{
            error: "You must provide a address to search"
        }])
    }

    res.send([{
        forecast: "Its sunny",
        location: "Riyadh"
    }])
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page not found",
        name: "Created by Arsalan"
    })
})

app.listen(3000, () => {
    console.log("Server is up and running")
})

