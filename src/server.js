const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const chatGroupRoutes = require('./routes/chatGroup.routes');
const chatMessageRoutes = require('./routes/chatMessage.routes');
const adminRoutes = require('./routes/admin.routes');

// To parse cookies
app.use(cookieParser());

// To parse the payload from request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Common routes
// Routes related to authenticate users
app.use('/auth', authRoutes);

// Authenitcated Admin routes
// Routes related to admin role
app.use('/admin', adminRoutes);

// Authenticated Normal user routes
app.use('/group', chatGroupRoutes);
app.use('/message', chatMessageRoutes);

const port = process.env.PORT || 5000;
const server = app.listen(port);

const closeServer = () => {
    server.close(() => {
        console.log('Server closed');
    });
};

// Handle process termination events to ensure the server is closed before exiting
process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);

module.exports = {app, server};
