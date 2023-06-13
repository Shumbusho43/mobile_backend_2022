const {
    validateCandidate,
    Candidate
} = require('../../models/candidate/candidate.model')
//signup user including address
exports.registerCandidate = async (req, res) => {
    try {
        const {
            names,
            gender,
            nationalID,
            missionStatement,
            profilePicture
        } = req.body;
        //validation
        const {
            error
        } = validateCandidate(req.body);
        if (error) return res.status(400).json({
            success: false,
            status: 400,
            message: error.details[0].message
        });
        //check if user exists by checking email or nationalID or phoneNumber
        const user = await Candidate.findOne({
            nationalID
        });
        if (user) return res.status(400).json({
            success: false,
            status: 400,
            message: 'Candidate exist'
        })
        //create new user
        const newUser = new Candidate({
            names,
            gender,
            nationalID,
            missionStatement,
            profilePicture
        });
        //save user
        await newUser.save();
        //send token to client
        return res.status(201).json({
            success: true,
            status: 201,
            message: "Candidate created successfully",
            data: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

//getting list of users

exports.getAllCandidates = async (req, res) => {
    try {
        const Candidates = await Candidate.find();
        if (Candidates) return res.status(200).json({
            success: true,
            status: 200,
            message: "Candidates retrieved successfully",
            data: Candidates
        })
        return res.status(404).json({
            success: false,
            status: 404,
            message: "No Candidates found"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
//getting total votes
exports.totalVotes = async (req, res) => {
    try {
        const votes = await Candidate.find().select('names profilePicture gender missionStatement votes');
        return res.status(200).json({
            success: true,
            message: "total votes",
            data: votes
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}