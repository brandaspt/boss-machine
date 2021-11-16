const express = require("express")
const checkMillionDollarIdea = require("./checkMillionDollarIdea")
const ideasRouter = express.Router()
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require("./db")
const { createError } = require("./util")

ideasRouter.param("ideaId", (req, res, next, id) => {
    const idea = getFromDatabaseById("ideas", id)
    if (idea) {
        req.idea = idea
        next()
    } else {
        next(createError(404, `idea with id ${id} not found`))
    }
})

ideasRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("ideas"))
})

ideasRouter.get("/:ideaId", (req, res, next) => {
    const ideaId = req.params.ideaId
    const idea = getFromDatabaseById("ideas", ideaId)
    if (idea) {
        res.send(idea)
    } else {
        next(createError(404, `Could not find idea with id of ${ideaId}`))
    }
})

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
    try {
        const newIdea = addToDatabase("ideas", req.body)
        res.status(201).send(newIdea)
    } catch (error) {
        error.status = 400
        next(error)
    }
})

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
    try {
        const updatedIdea = updateInstanceInDatabase("ideas", req.body)

        res.send(updatedIdea)
    } catch (error) {
        error.status = 400
        next(error)
    }
})

ideasRouter.delete("/:ideaId", (req, res, next) => {
    const ideaId = req.params.ideaId
    const isSuccessfullyDeleted = deleteFromDatabasebyId("ideas", ideaId)
    if (isSuccessfullyDeleted) {
        res.sendStatus(204)
    } else {
        next(createError(404, `Could not find idea with id of ${ideaId}`))
    }
})

module.exports = ideasRouter
