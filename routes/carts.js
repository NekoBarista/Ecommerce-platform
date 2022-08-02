const express = require('express')
const cartsRepo = require('../repositories/carts')
const productsRepo = require('../repositories/products')
const showCartTemplate = require('../views/carts/show')

const router = express.Router()


router.get('/cart', async(req, res) => {

    if(!req.session.cartId) {
res.redirect('/')
    }

    const cart = await cartsRepo.getOne(req.session.cartId)

    for (let item of cart.items) {

      const product =  await productsRepo.getOne(item.id)
      item.product = product


    }

    res.send(showCartTemplate({items: cart.items}))
    
    })

    router.post('/cart/products', async(req, res) => {
let cart
   if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
   req.session.cartId = cart.id

   } else {
     cart = await cartsRepo.getOne(req.session.cartId)

   }
const existingItem = cart.items.find(item => item.id === req.body.productId)

if(existingItem) {

    existingItem.quantity++
}
else {

    cart.items.push({id: req.body.productId, quantity: 1})
}

await cartsRepo.update(cart.id, {items: cart.items });
    



    res.send("Product added to cart")
        
        })




        router.post('/cart', async(req, res) => {

    
        })

module.exports = router
