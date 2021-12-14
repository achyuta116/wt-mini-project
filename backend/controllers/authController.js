const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.code);
    let error = {
        email: '', password: ''
    };

    if(err.message === 'Incorrect email'){
        error.email = 'That email is not registered'
    }

    if(err.message === 'Incorrect password'){
        error.password = 'That password is incorrect'
    }

    if(err.code === 11000){
        error.email = 'That email is already registered'
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message;
        })
    }
    return error
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'dronedex secret', {
        expiresIn: maxAge
    });
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.get_user_get = (req, res) => {
    const token = req.cookies.jwt;
    // check jwt exists & verify
    if(token){
        jwt.verify(token, 'dronedex secret', async (err, decoded) => {
            if(err){
                //redirect or send not authenticated message
                res.json({authenticated: false});
            } else {
                console.log(decoded);
                let user = await User.findById(decoded.id);
                res.json({authenticated: true, user});
            }
        })
    } else {
        // redirect or send not authenticated message
        res.json({authenticated: false})
    }    
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).json('success');
}
