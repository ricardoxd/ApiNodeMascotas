import Joi from '@hapi/joi';

export const createPersonaValidation = Joi.object().keys({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  mascotas: Joi.array().items(
      Joi.object().keys({
        nombre: Joi.string().required(),
        idTipoMascota: Joi.number().required()
      }),
  ).required()
});
