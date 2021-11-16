const express = require("express")
const minionsRouter = require("./minionsRouter")
const ideasRouter = require("./ideasRouter")
const meetingsRouter = require("./meetingsRouter")
const apiRouter = express.Router()

apiRouter.use("/minions", minionsRouter)
apiRouter.use("/ideas", ideasRouter)
apiRouter.use("/meetings", meetingsRouter)

module.exports = apiRouter
