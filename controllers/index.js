const userRoutes = require('./routes/api/userRoutes');
const postRoutes = require('./routes/api/postRoutes');


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// existing routes
app.use(routes);