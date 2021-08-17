require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); 
const { storyRouter } = require('./routes/storyRoutes');
const { mainRouter } = require('./routes/mainRoutes');
const Story = require('./models/story');
const authRouter = require('./routes/authRoutes');
const { checkUserStatus } = require('./middleware/authMiddleware');
const app = express();

// Middleware
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use(cookieParser());

// Connect to db
const dbURI = process.env.DB_URI; 

const port = 5000 || process.env.port;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true  })
.then(result => app.listen(port, () => console.log(`listeing for requets on port ${port}`)))
.catch(err => console.log(err));

// View engine
app.set('view engine', 'ejs');

// Routes
app.get('*', checkUserStatus);
app.use('/', mainRouter);
app.use('/', authRouter);
app.use('/stories', storyRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
