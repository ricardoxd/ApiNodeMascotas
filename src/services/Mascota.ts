import { IMascota } from '../interfaces/IMascota';
import {
  findMascotasDB
} from '../db/Mascota';

/**
 * Listar mascotas por persona
 * @param  {number} idPersona id de persona a filtrar
 * @return {Promise<IMascota[] | undefined>}
 */
export const findMascotasService = async (idPersona: number): Promise<IMascota[] | undefined> => {
	const mascotas = await findMascotasDB(idPersona);
  return mascotas;
};