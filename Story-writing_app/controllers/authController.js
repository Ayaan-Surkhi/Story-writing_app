const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    let errors = {email: '', username: '', password: ''}

    // Duplicate error code
    if(err.code === 11000){
        if(err.keyValue.hasOwnProperty('username')){
            errors.username = 'That username is already registered';
        }else{
            errors.email = 'That email is already registered';
        }

        return errors;
    }

    // validation errors
    if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
    });  
    }

    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'That email is already registered';
    }

    // incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'The password is incorrect';
    }

    return errors;
}

const maxAge = 60 * 60 * 24 * 10;
const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });

    return token;
}

const signupGet = (req, res) => {
    res.render('signup');
}

const loginGet = (req, res) => {
    res.render('login', { authRequired: false });
}

const signupPost = async (req, res) => {
    const { email, username, password } = req.body;

    try{
      const user = await User.create({email, username, password});  
      const token = createToken(user._id);
      res.cookie('jwt', token, { maxAge: maxAge*1000, httpOnly: true });
      res.status(201).json({user: user._id});  
    }catch(err){
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({errors});
    }
}

const loginPost = async (req, res) => {
   const { email, password} = req.body;

   try{
    const user = await User.login(email , password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: maxAge*1000, httpOnly: true});
    res.status(202).json({ user: user._id });
    }catch(err){
       const errors = handleErrors(err);
       console.log(err);
       res.status(400).json({errors});
   }     
}

const logoutGet = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1, httpOnly: true });
    res.redirect('/');
}

module.exports = {
    signupGet,
    signupPost,
    loginGet,
    loginPost,
    logoutGet
}
