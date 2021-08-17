const Story = require('../models/story');

const homePost = async (req, res) => {
    const { title, snippet, author, story, color } = req.body;
    const fileExistCheck = req.hasOwnProperty('file');
    const file = fileExistCheck ? (req.file.path) : ('');
    try{
    const storyObj = await Story.create({title, snippet, author, story, color, thumbnail: file});
    res.redirect('/');
    }
    catch(err){
      console.log(err);
    }
};

const newStoryGet = (req, res) => {
    res.render('addNewStory');
};

const indiStoryGet = (req, res) => {
    const id = req.params.id;

    Story.findById(id)
    .then(result => {
        const story = result;
        res.render('indiStory', { story });
    })
    .catch(err => {
        console.log(err)
        res.render('404');
    });
};

const indiStoryDelete = (req, res) => {
    const id = req.params.id;

    Story.findByIdAndDelete(id)
    .then(result => res.json({ redirect: '/'}) )
    .catch(err => console.log(err))
};

const storyUpdateGet = (req, res) => {
    const id = req.params.id;

    Story.findById(id)
    .then(result => {
        const story = result;
        res.render('updateStory', { story });
    })
    .catch(err => console.log(err))
    ;
};

const storyUpdatePost = (req, res) => {
    const { title, snippet, author, story, color } = req.body;
    const id = req.params.id;

    Story.findById(id)   
    .then(result => {
        const previousFile = result.thumbnail;
        updateStory(previousFile);
    })
    .catch(err => console.log(err))
    ;

    const updateStory = (previousFile) => {
    const fileExistCheck = req.hasOwnProperty('file');
    const file =  fileExistCheck ? (req.file.path) : (previousFile);        

    const query = {_id: req.params.id};

    Story.findOneAndUpdate(query, {title, snippet, author, story, color, thumbnail: file} , { new: true })
    .then(result => {  
      const story = result;  
      res.redirect(`/stories/${story._id}`);
    })
    .catch(err => console.log(err))
    ;
}
};

module.exports = {
    homePost,
    newStoryGet,
    indiStoryGet,
    indiStoryDelete,
    storyUpdateGet,
    storyUpdatePost
}