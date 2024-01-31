const express = require('express')
const facts = require('./facts.json')

const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("Good Job!")

})

// http://localhost:3000/greet?name=priscilla&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)

    // capitalizes name
    let name = req.query.name

    let capitalized =
      name.charAt(0).toUpperCase()
      + name.slice(1)

    let currentYear = new Date().getFullYear()
    let ageA = currentYear - req.query.dob - 1
    let ageB = currentYear - req.query.dob

    res.send(`Hello, ${capitalized}!\n You are ${ageA} or ${ageB} years old.`)
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    let operation = req.params.op
    let result = 0

    if (operation == 'plus')
    {
        // when I use a plus sign, it combines the strings, so this is a substitute solution
        result = req.params.num1 - (-req.params.num2)
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

    // Random Dad Jokes

    fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
        })

        .then(res => res.json)
        .then((data) => {
            console.log(data)
            res.render('pandorasbox', {title: "Pandora's Box", message: data.joke})
        })

    // Random Facts
    const length = facts.length
    let randNumber = Math.floor((Math.random() * length))
    const fact = facts[randNumber].fact

    res.render('pandorasbox', {title: "Pandora's Box", message:fact} )
})