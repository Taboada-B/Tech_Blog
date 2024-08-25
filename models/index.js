const User = require('./user');
const Post = require('./post');

User.hasMany(Post, {
    foreignKey: 'userId',
    // as: 'user',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    // as: 'user'
});

module.exports = { User, Post };