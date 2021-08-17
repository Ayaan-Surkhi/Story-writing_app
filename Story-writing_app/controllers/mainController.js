const Story = require('../models/story');

const homeGet = (req, res) => {
    Story.find()
    .then(result => {
        res.render('index', { stories: result });
    })
    .catch(err => console.log(err));
};

const aboutGet = (req, res) => {
    res.render('about');
};

module.exports = {
    homeGet,
    aboutGet
}