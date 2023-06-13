const express = require("express");
const {
    protect,
    role
} = require("../../middleware/protect");
const { voting } = require("../../controllers/voting/voting.controller");
const Router = express.Router();
Router.post("/:candidateId", protect, role("voter"),voting)
module.exports.votingRouter = Router;