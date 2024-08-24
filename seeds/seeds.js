const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const session = require('express-session');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Bulk create users
  const user = await User.bulkCreate(userData, {
    individualHooks: true, // Ensures hooks like password hashing are run
    returning: true, // Returns the inserted user objects, including their IDs
  });

  // Bulk create posts with specific user IDs
 for (const post of postData) {
  
  await Post.create({
    ...post,
    user_id: session.id, 
  });
}

  process.exit(0);
};

seedDatabase();
