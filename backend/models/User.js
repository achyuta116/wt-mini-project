const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        unique: true,
        validate: [(val) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
        }, 'Please enter a valid email']
    },
    password:{
        type: String, 
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    cart: {
        type: Array,
        default: []
    },
    orderHistory:{
        type: Array,
        default: []
    }
});

//after doc is d to db
// userSchema.post('save', function (doc, next) {
    
//     next();
// });

//fire before doc is saved to db
userSchema.pre('save', async function (next){
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;