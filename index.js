const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const UsersRepository = require('./repositories/users');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({keys: ['jad1hv7kj23ha2kjd'] }));
app.get('/signup', (req, res) => {
  res.send(`
    <div>
    Your ID is: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
const existingUser = await UsersRepository.getOneBy({ email });
if (existingUser) {
   return  res.send("User already exists with this email") 
}

if(password !== passwordConfirmation) {
    return res.send("Password must match confirmation")
}

const user = await UsersRepository.create({email, password})

req.session.userId = user.id

  res.send('Account created!!!');
});


app.get('/signout', (req, res) => {
  req.session = null;
  res.send("You are now logged out")

})

app.get('/signin',(req, res) => {
  res.send(` <div>
  
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>`)
})


app.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const user = await UsersRepository.getOneBy({email})

  const validPassword = await UsersRepository.comparePassword(user.password, password)
  if (!user) {
    return res.send("No user found with this email")
  }

  if (!validPassword) {
    return res.send("Password incorrect, please try again")
  }

  req.session.userId = user.id

  res.send("You are signed in!")
  
})

app.listen(3000, () => {
  console.log('Listening');
});
