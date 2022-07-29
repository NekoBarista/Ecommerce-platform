const express = require('express');
const bodyParser = require('body-parser');
const UsersRepository = require('./repositories/users')



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
const existingUser = await UsersRepository.getOneBy({ email });
if (existingUser) {
   return  res.send("User already exists with this email") 
}

if(password !== passwordConfirmation) {
    return res.send("Password must match confirmation")
}


  res.send('Account created!!!');
});

app.listen(3000, () => {
  console.log('Listening');
});
