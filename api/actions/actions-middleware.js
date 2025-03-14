// add middlewares here related to actions
const actions = require('../actions/actions-model')
const projects = require('../projects/projects-model')

async function validateActionId(req, res, next) {
    try {
        const action = await actions.get(req.params.id)
        if(!action) {
            return res.status(404).json({ message: 'Action not found'})
        }
        req.action = action
        next()
    } catch (err) {
        next(err)
    }
}

async function validateActionPayload(req, res, next) {
    const { project_id, description, notes } = req.body
        if (!project_id || !description || !notes) {
            return res.status(400).json({ message: 'Missing required fields: project_id, description, notes'})
        }

        if (description.length > 128) {
            return res.status(400).json({ message: 'Description must be 128 characters or less'})
        }

        try {
            const project = await projects.get(project_id)
            if (!project) {
                return res.status(400).json({ messag: 'Invalid project_id'})
            }
            next()
        } catch (err) {
            next(err)
    }
}

module.exports = {
    validateActionId,
    validateActionPayload
}

