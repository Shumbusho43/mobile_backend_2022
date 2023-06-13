//model candidate is made up of names,national ID, profile, gender,mission statement
const mongoose = require('mongoose');
const Joi = require('joi');
const condidateSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    nationalID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        min: 16,
        max: 16
    },
    profilePicture: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
        enum: ["M", "F"]
    },
    missionStatement: {
        type: String,
        required: true,
        trim: true,
        min: 20,
        max: 200
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

//validate above schema with joi package
const validateCandidate = (candidate) => {
    const schema = Joi.object({
        names: Joi.string().min(3).max(20).required(),
        nationalID: Joi.string().min(16).max(16).required(),
        missionStatement: Joi.string().min(20).max(200).required(),
        gender: Joi.string().valid("M", "F").required(),
        profilePicture: Joi.string().required()
    });
    return schema.validate(candidate);
}
module.exports.validateCandidate = validateCandidate;
module.exports.Candidate = mongoose.model('Candidate', condidateSchema);