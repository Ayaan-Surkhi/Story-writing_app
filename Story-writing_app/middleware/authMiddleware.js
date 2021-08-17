const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.render('login', { authRequired: true });
            }else{
                next();
            }
        });
    }else{
        res.render('login', { authRequired: true });
    }
};

const checkUserStatus = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'jV1&fU2/wK8$iT5&nA7@pM8{yW5@sM', async (err, decodedToken) => {
          if(err){
              res.locals.user = null;

              next();
          }else{
            const user = await User.findById(decodedToken.id);
            res.locals.user = user;

            next();
          }  
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUserStatus };