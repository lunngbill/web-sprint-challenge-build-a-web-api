// Write your "actions" router here!
const express = require('express')
const actions = require('../actions/actions-model')
const { validateActionId, validateActionPayload } = require('./actions-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const action = await actions.get()
        res.json(action)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateActionId, async (req, res) => {
        res.json(req.action)

})

router.post('/', validateActionPayload, async (req, res, next) => {
    try {
        const newAction = await actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateActionId, validateActionPayload, async (req, res, next) => {
    try {
        const updateAction = await actions.update(req.params.id, req.body)
        res.json(updateAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await actions.remove(req.params.id)
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = router