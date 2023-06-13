const {
    Candidate
} = require("../../models/candidate/candidate.model");
const {
    User
} = require("../../models/user/user.model");

exports.voting = async (req, res) => {
    try {
        const {
            candidateId
        } = req.params
        if (!candidateId) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "candidate id is required"
            })
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                status: 404,
                message: "user not found"
            })
        }
        if (user.voted == true) {
            return res.status(400).json({
                status: false,
                message: "You have already voted."
            })
        }
        //checking if given candidate exsts in our database
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) return res.status(404).json({
            success: false,
            status: 400,
            message: "Candidate not found"
        })
        //updating votes for given candidate
        candidate.votes++;
        await candidate.save();
        //updating user voted to true,
        user.voted = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "User voted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}