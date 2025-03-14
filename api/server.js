const express = require('express');
const server = express();
const cors = require('cors')

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

server.use(express.json())
server.use(cors())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.send('API is running...')
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
