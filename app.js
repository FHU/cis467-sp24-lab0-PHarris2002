const express = require('express')
const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("Good Job!")

})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)

    res.send(`hey, ${req.query.name}`)
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    let operation = req.params.op
    let result = 0

    if (operation == 'plus')
    {
        result = req.params.num1 + req.params.num2
    }
    
    else if (operation == 'minus') {
        result = req.params.num1 - req.params.num2
    }
    
    else if (operation == 'times') {
        result = req.params.num1 * req.params.num2
    }
    
    else if (operation == 'dividedby') {
        result = req.params.num1 / req.params.num2
    }
    
    else if (operation == 'tothepowerof') {
        result = req.params.num1 * (req.params.num1 * (req.params.num2 - 1))
    }
    
    else {
        result = 'Invalid Operation'
    }
    
    res.send(`${result}`)
})

app.get('/pandorasbox', (req, res)=> {

    // do the work
    const message = "DAD JOKE"

    res.render('pandorasbox', {title: "Pandora's Box", message} )

})