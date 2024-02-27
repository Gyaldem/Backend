const Challenge = require('../models/challenge');
const addRequirement = (req, res) => {
    req.body.challenge.addRequirement(req.body.requirement);
}

const addCoefficientToRequirement = (req, res) => {
    req.body.challenge.addCoefficientToRequirement(req.body.requirement, req.body.coefficient);
}

module.exports = {
    addRequirement,
    addCoefficientToRequirement
};