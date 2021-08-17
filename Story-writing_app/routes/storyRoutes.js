const { Router } = require('express');
const { homePost,  indiStoryGet, indiStoryDelete, storyUpdateGet, storyUpdatePost, newStoryGet } = require('../controllers/storyController');
const storyRouter = Router();
const multer = require('multer');
const { requireAuth } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getMilliseconds() + file.originalname)
    }
})

const upload = multer({storage: storage});
storyRouter.get('/new-story', requireAuth, newStoryGet);
storyRouter.post('/', upload.single('thumbnail'), homePost);
storyRouter.get('/:id', indiStoryGet);
storyRouter.delete('/:id', indiStoryDelete);
storyRouter.get('/update-story/:id', storyUpdateGet);
storyRouter.post('/:id',  upload.single('thumbnail'), storyUpdatePost);

module.exports = { 
    storyRouter 
}
