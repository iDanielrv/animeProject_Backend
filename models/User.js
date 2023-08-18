const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})



userSchema.pre('save', async function(next) {
    console.log('esse é o this: ', this);
    console.log(this.password);
    
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.post('save', function (doc, next) {
    console.log('post Save:',doc._doc);
    next()
})

const User = mongoose.model('user', userSchema);

module.exports = User