import { Request, Response, NextFunction } from 'express';
import { createPersonaService, findPersonasService } from '../services/Persona';
import { IPersona } from "../interfaces/IPersona";

/**
 * Crear Persona controller
 * @param  {Request} req Reques express
 * @param  {Response} res Response express
 * @param  {NextFunction} next Next function express
 * @return {ServerResponse}
 */
export const createPersonaController = async (req: Request, res: Response, next: NextFunction) => {
  try {
  	const newPersona: IPersona = req.body;
    const persona = await createPersonaService(newPersona);
    if (persona) {
    	res.status(200).send(persona);
    } else {
    	res.status(404).send('No Create');
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

/**
 * Listar personas de Persona controller
 * @param  {Request} req Reques express
 * @param  {Response} res Response express
 * @param  {NextFunction} next Next function express
 * @return {ServerResponse}
 */
export const findPersonasController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const personas = await findPersonasService();
    if (personas) {
      res.status(200).send(personas);
    } else {
      res.status(404).send('No List');
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};