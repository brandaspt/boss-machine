const express = require("express")
const minionsRouter = express.Router()
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require("./db")
const { createError } = require("./util")

minionsRouter.param("minionId", (req, res, next, id) => {
    const minion = getFromDatabaseById("minions", id)
    if (minion) {
        req.minion = minion
        next()
    } else {
        next(createError(404, `minion with id ${id} not found`))
    }
})

minionsRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("minions"))
})

minionsRouter.get("/:minionId", (req, res, next) => {
    const minionId = req.params.minionId
    const minion = getFromDatabaseById("minions", minionId)
    if (minion) {
        res.send(minion)
    } else {
        next(createError(404, `Could not find minion with id of ${minionId}`))
    }
})

minionsRouter.post("/", (req, res, next) => {
    try {
        const newMinion = addToDatabase("minions", req.body)
        res.status(201).send(newMinion)
    } catch (error) {
        next(error)
    }
})

minionsRouter.put("/:minionId", (req, res, next) => {
    try {
        const updatedMinion = updateInstanceInDatabase("minions", req.body)
        if (updatedMinion) {
            res.send(updatedMinion)
        } else {
            throw createError(404, `Could not find minion with id of ${minionId}`)
        }
    } catch (error) {
        next(error)
    }
})

minionsRouter.delete("/:minionId", (req, res, next) => {
    const minionId = req.params.minionId
    const isSuccessfullyDeleted = deleteFromDatabasebyId("minions", minionId)
    if (isSuccessfullyDeleted) {
        res.sendStatus(204)
    } else {
        next(createError(404, `Could not find minion with id of ${minionId}`))
    }
})

module.exports = minionsRouter
