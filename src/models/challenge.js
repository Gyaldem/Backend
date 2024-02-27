const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  requirements: {
    type: Map,
    of: Number, // Key is a string (requirement), value is a number (coefficient)
    required: true,
    validate: {
      validator: function (requirements) {
        const totalCoefficientSum = [...requirements.values()].reduce((sum, coefficient) => sum + coefficient, 0);
        return totalCoefficientSum === 1;
      },
      message: props => `The coefficients sum must equal 1, but the current sum is ${props.value}`,
    },
    default: function () {
      const numberOfRequirements = Object.keys(this.schema.paths.requirements.caster.options.of).length;
      const defaultCoefficient = 1 / numberOfRequirements;
      const defaultRequirements = {};
      for (const key of this.schema.paths.requirements.caster.options.of.keys()) {
        defaultRequirements[key] = defaultCoefficient;
      }
      return defaultRequirements;
    },
  },
});

challengeSchema.methods.addRequirement = function (requirementName) {
  // Check if the requirement already exists
  if (this.requirements.has(requirementName)) {
    throw new Error(`Requirement '${requirementName}' already exists for this challenge.`);
  }

  // Set the default coefficient for the new requirement
  const defaultCoefficient = 1 / (this.requirements.size + 1);

  // Add the new requirement to the map with the default coefficient
  this.requirements.set(requirementName, defaultCoefficient);
};

challengeSchema.methods.addCoefficientToRequirement = function (requirementName, coefficient) {
  // Check if the requirement exists
  if (!this.requirements.has(requirementName)) {
    throw new Error(`Requirement '${requirementName}' does not exist for this challenge.`);
  }

  // Validate the coefficient
  if (coefficient < 0 || coefficient > 1) {
    throw new Error('Coefficient must be between 0 and 1.');
  }

  // Update the coefficient for the specified requirement
  this.requirements.set(requirementName, coefficient);
};

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
