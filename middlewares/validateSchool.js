const Joi = require("joi");

const addSchoolSchema = Joi.object({
  name: Joi.string().min(1).required(),
  address: Joi.string().min(1).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

const listSchoolsSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});
function validateAddSchool(req, res, next) {
  const { error } = addSchoolSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validateListSchools(req, res, next) {
  const { error } = listSchoolsSchema.validate(req.query);
  console.log(req.query);
  console.log("error:", error);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}
module.exports = {
  validateAddSchool,
  validateListSchools,
};
