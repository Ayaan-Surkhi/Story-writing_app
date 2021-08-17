const { Router } = require('express');
const { homeGet, aboutGet } = require('../controllers/mainController');
const mainRouter = Router();

mainRouter.get('/', homeGet);
mainRouter.get('/about', aboutGet);

module.exports = { 
    mainRouter 
}
