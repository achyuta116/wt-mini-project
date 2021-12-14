const Part = require('../models/Part');
const User = require('../models/User');

module.exports.cart_item_post = (req, res) => {
    const id = req.params.id;
    const { userEmail } = req.body;
    console.log(userEmail)
    Part.findById(id)
    .then(result => {
        console.log(result)
        User.findOne({email: userEmail}).then((user) => {
            console.log(user);
            user.cart = [...user.cart, result];
            user.save((err, updatedUser) => {
                if (err) throw Error(`Couldn't update user's cart with selected part`);
                console.log(updatedUser);
                res.json({ updatedUser });
            })
        });
    }).catch(err => {
        res.status(500).send({ error: err });
        console.log(err);
    });
}

module.exports.cart_item_delete = (req, res) => { //TODO modify cart item delete to work like the update ones
    const id = req.params.id;
    const { userEmail } = req.body;
    Part.findById(id)
    .then(result => {
        part = result;
        console.log(result)
        User.findOne({email: userEmail}).then(user => {
            user.cart = user.cart.filter(element => {
                if(element._id == req.params.id){
                    return false;
                }
                return true;
            })
            user.save((err, updatedUser) => {
                if (err) throw Error(`Couldn't update user's cart with selected part`);
                console.log(updatedUser);
                res.json({ updatedUser });
            })
        })
    }).catch( err => {
        res.status(500).json({ error: err });
    });
}

module.exports.cart_items_get = (req, res) => {
    const userEmail = req.params.email;
    User.findOne({email: userEmail}).then(user => {
        res.json({ cart: user.cart });
    }).catch(err => {
        res.status(500).send({ error: err });
    })
}

module.exports.order_history_post = (req, res) => {
    const { userEmail } = req.body;
    User.findOne({email: userEmail}).then((user) => {
        console.log(user);
        user.orderHistory = [...user.orderHistory, user.cart];
        user.cart = [];
        user.save((err, updatedUser) => {
            if (err) throw Error(`Couldn't place order please try again`);
            res.json({ updatedUser });
            console.log(updatedUser);
        })
    });
}

module.exports.order_history_get = (req, res) => {
    const { userEmail } = req.body;
    User.findOne({email: userEmail}).then(user => {
        res.json({ orderHistory: user.orderHistory });
    }).catch(err => {
        res.status(500).send({ error: err });
    })
}