import { Request, Response, NextFunction } from 'express';
import { findMascotasService } from '../services/Mascota';
import { IPersona } from "../interfaces/IPersona";

/**
 * Listar mascotas de Persona controller
 * @param  {Request} req Reques express
 * @param  {Response} res Response express
 * @param  {NextFunction} next Next function express
 * @return {ServerResponse}
 */
export const findMascotabyPersonaController = async (req: Request, res: Response, next: NextFunction) => {
  try {
  	const { id } = req.params;
    const mascotas = await findMascotasService(Number(id));
    if (mascotas) {
    	res.status(200).send(mascotas);
    } else {
    	res.status(404).send('No List');
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};