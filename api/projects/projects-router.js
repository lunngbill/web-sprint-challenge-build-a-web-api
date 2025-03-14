// Write your "projects" router here!
const express = require('express')
const projects = require('../projects/projects-model')
const { validateProjectId, validateProjectPayload } = require('./projects-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const project = await projects.get()
        res.json(project)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, async (req, res) => {
        res.json(req.project)
})

router.post('/', validateProjectPayload, async (req, res, next) => {
    try {
        const newProject = await projects.insert(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateProjectId, validateProjectPayload, async (req, res, next) => {
    try {
        const updateProject = await projects.update(req.params.id, req.body)
        res.json(updateProject)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await projects.remove(req.params.id)
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await projects.getProjectActions(req.params.id)
        res.json(actions)
    } catch (err) {
        next(err)
    }
})

module.exports = router