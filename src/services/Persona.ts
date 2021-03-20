import { IPersona } from '../interfaces/IPersona';
import {
  createPersonaDB,
  findPersonasDB
} from '../db/Persona';

/**
 * Crear persona
 * @param  {Persona} newPersona Datos para crear persona
 * @return {Promise<IPersona | undefined>}
 */
export const createPersonaService = async (newPersona: IPersona): Promise<IPersona | undefined> => {
	const persona = await createPersonaDB(newPersona);
  return persona;
};

/**
 * Listar personas por persona
 * @return {Promise<IPersona[] | undefined>}
 */
export const findPersonasService = async (): Promise<IPersona[] | undefined> => {
	const mascotas = await findPersonasDB();
  return mascotas;
};