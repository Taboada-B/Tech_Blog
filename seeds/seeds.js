const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Bulk create users
  const users = await User.bulkCreate(userData, {
    individualHooks: true, // Ensures hooks like password hashing are run
    returning: true, // Returns the inserted user objects, including their IDs
  });

  // Bulk create posts with specific user IDs
  for (const post of postData) {
    // Assign a random valid user_id from the users array
    const randomUser = users[Math.floor(Math.random() * users.length)];

    await Post.create({
      ...post,
      user_id: randomUser.id, // Assign the user ID to the post just for seeding data.
    });
  }

  process.exit(0);
};

seedDatabase();