const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    color: {
        type: String,
        require: false
    }    
}, { timestamps: true });

const Story = mongoose.model('Story', storySchema);
module.exports = Story;