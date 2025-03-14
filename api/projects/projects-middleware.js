// add middlewares here related to projects
const projects = require('../projects/projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await projects.get(req.params.id)
        if(!project) {
            return res.status(404).json({ message: 'Project not found'})
        }
        req.project = project
        next()
    } catch (err) {
        next(err)
    }
}

async function validateProjectPayload(req, res, next) {
    const { name, description, completed } = req.body
        if (!name || !description || completed === undefined) {
            return res.status(400).json({ message: 'Missing required fields: name, description or completed'})
        }
        
        next()
    
}

module.exports = {
    validateProjectId,
    validateProjectPayload
}