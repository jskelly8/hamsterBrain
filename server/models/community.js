const { Schema, model } = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type : String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Post = model('Post', PostSchema)

module.exports = Post;