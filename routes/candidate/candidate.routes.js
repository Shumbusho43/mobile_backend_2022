const express = require("express");
const Router = express.Router();
const {
    registerCandidate,
    getAllCandidates,
    totalVotes
} = require("../../controllers/candidate/candidate.controller");
const {
    protect,
    role
} = require("../../middleware/protect");
Router.get('/', protect, getAllCandidates)
Router.post('/register', protect, role("admin"), registerCandidate);
Router.get("/totalVotes", protect, role("admin", "voter"), totalVotes);
module.exports.candidateRoutes = Router;