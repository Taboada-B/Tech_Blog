const User = require('./user');
const Post = require('./post');

User.hasMany(post, {



})

Post.belongsTo(user, {

})


module.exports = { User, Post };