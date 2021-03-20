import express, { Router } from 'express';
import { PathParams } from 'express-serve-static-core';
import { findMascotabyPersonaController } from '../controllers/MascotaController';
const routes = express.Router();

const findbyPersona: PathParams = '/bypersona/:id';

routes.get(findbyPersona, findMascotabyPersonaController);

export = routes;