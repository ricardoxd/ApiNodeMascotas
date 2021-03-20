import express, { Router } from 'express';
import { PathParams } from 'express-serve-static-core';
import { createPersonaController, findPersonasController } from '../controllers/PersonaController';
import { createPersonaValidation } from '../util/hapi/joi';
import { JoiValidator } from '../middlewares/JoiValidator';
const routes = express.Router();

const createPersona: PathParams = '/create';
const findPersonas: PathParams = '/list';

routes.post(createPersona, JoiValidator(createPersonaValidation), createPersonaController);
routes.get(findPersonas, findPersonasController);

export = routes;