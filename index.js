const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {

res.send(`<div>
<form method="POST">
<input placeholder="Email" name="email"/>
<input placeholder="Password" name="password"/>
<input placeholder="Password Confirmation" name="passwordConfirmation"/>
<button>Sign Up</button>
</form>
</div>`)
})





app.post('/', (req, res) => {
    console.log(req.body)
    res.send("Account Created")})


app.listen(3000,()=>
{console.log("Listening")})