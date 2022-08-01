
const express = require('express')
const UsersRepository = require('../../repositories/users')
const router = express.Router()
const signupTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
  });
  
  router.post('/signup', async (req, res) => {
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
  
  
  router.get('/signout', (req, res) => {
    req.session = null;
    res.send("You are now logged out")
  
  })
  
  router.get('/signin',(req, res) => {
    res.send(signinTemplate())
  })
  
  
  router.post('/signin', async (req, res) => {
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

  module.exports = router