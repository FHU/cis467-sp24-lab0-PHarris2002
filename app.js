const express = require('express')
const facts = require('./facts.json')

const app = express()

const PORT = process.env.PORT || "3000"

app.use(express.static('public'));

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("This is an introductory assignment for DevOps! Feel free to access any of the following directories: /greet, /math, /pandorasbox")

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
    let valueOne = parseInt(req.params.num1)
    let valueTwo = parseInt(req.params.num2)
    let result = 0

    switch (operation) {
        case 'plus':
            // when I use a plus sign, it combines the strings, so this is a substitute solution
            result = valueOne + valueTwo
            break;
    
        case 'minus':
            result = valueOne - valueTwo
            break;
    
        case 'times':
            result = valueOne * valueTwo
            break;
    
        case 'dividedby':
            result = valueOne / valueTwo
            break;
    
        case 'tothepowerof':
            result = valueOne * (valueOne * (valueTwo - 1))
            break;
    
        default:
            result = 'Invalid Operation'
    }
    
    res.send(`${result}`)
})

app.get('/pandorasbox', (req, res)=> {
    res.render('pandorasbox', {title: "Pandora's Box", message:"Add /fact to the end of this page's path to generate a random fact. Add /joke to the end of this page's path to generate a random dad joke."})
})

app.get('/pandorasbox/:path', (req, res)=> {
    const pandoraPath = req.params.path

    // Switch Case
    switch (pandoraPath) {
        case 'joke':
            fetch("https://icanhazdadjoke.com/", { 
                headers: {
                    "Accept": "application/json"
                }
                })
                .then( res => res.json() )
                .then( (data) => {
                    console.log(data)
                    res.render('pandorasbox', {title: "Pandora's Box", message: 'Random Dad Joke: ' + data.joke} )
                })
            break;
    
        case 'fact':
            // Random Facts
            const length = facts.length
            let randNumber = Math.floor((Math.random() * length))
            const fact = facts[randNumber].fact

            res.render('pandorasbox', {title: "Pandora's Box", message: 'Random Fact: ' + fact} )
            break;
        
        default:
            result = 'Invalid Path'}

    // // Random Dad Jokes
    // fetch("https://icanhazdadjoke.com/", { 
    //     headers: {
    //         "Accept": "application/json"
    //     }
    //     })
    //     .then( res => res.json() )
    //     .then( (data) => {
    //         console.log(data)
    //         res.render('pandorasbox', {title: "Pandora's Box", message: data.joke} )
    //     })

    // // Random Facts
    // const length = facts.length
    // let randNumber = Math.floor((Math.random() * length))
    // const fact = facts[randNumber].fact

    // res.render('pandorasbox', {title: "Pandora's Box", message: fact} )
})