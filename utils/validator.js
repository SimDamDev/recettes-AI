const Joi = require('joi');

const validateIngredient = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    pluralName: Joi.string().required(),
    quantity: Joi.number().required(),
    unit: Joi.array().items(Joi.string()).required(),
    image: Joi.string().uri().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    // si une erreur se produit, passez-la au middleware de gestion des erreurs avec un message d'erreur approprié
    return next(new Error(error.details[0].message));
  }

  // si les données sont valides, passez au prochain middleware
  next();
};

module.exports = {
  validateIngredient,
};

//TODO quantité a gerer das recette et pas ici!