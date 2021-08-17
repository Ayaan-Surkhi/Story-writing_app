const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        lowecase: true,
        required: [true, 'please enter email'],
        validate: [isEmail, 'please enter a valid email'],
    },
    username:{
        type: String,
        unique: true,
        required: [true, 'please enter username'],
    },
    password:{
        type: String,
        minlength: [8, 'minimum password length is 8 characters'],
        required: [true, 'please enter password'],
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});

    if(user){
        const checkUser = await bcrypt.compare(password, user.password);

        if(checkUser){
            return user;
        }
        
        throw Error('incorrect password');
    }
    
    throw Error('incorrect email');
}

const User = mongoose.model('User', userSchema);

module.exports = User;