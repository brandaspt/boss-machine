const { createError } = require("./util")

const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body
    if (Number(numWeeks) * Number(weeklyRevenue) >= 1000000) {
        next()
    } else {
        res.status(400).send("Idea must be $1,000,000 or more")
    }
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea
