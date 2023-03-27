// importing our models
const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');
// user has many posts, references userId, deletes everything that belongs to the user upon deletion
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});
// user has many comments, references userId, deletes everything that belongs to the user upon deletion
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
// posts have many comments, references postId, deletes everything that belongs to that post upon deletion
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

module.exports = { User, Comment, Post };
