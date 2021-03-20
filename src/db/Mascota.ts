import {
  executeQuery,
  beginTransaction,
  getPoolConnection,
  commitTransaction,
  rollbackTransaction,
  releaseAndCloseConnection,
} from '../util/mariadb/mariadb';
import { PoolConnection } from 'mariadb';
import { IPersona } from "../interfaces/IPersona";
import { IMascota } from "../interfaces/IMascota";

/**
 * Listar mascotas por personas en DB
 * @param  {number} idPersona id de persona a filtrar
 * @return {Promise<IMascota[] | undefined>}
 */
export const findMascotasDB = async (idPersona: number): Promise<IMascota[] | undefined> => {
  let conn: PoolConnection | undefined;
  let result: IMascota[] | undefined; let sql;

  try {
    conn = await getPoolConnection();
    await beginTransaction(conn);
    sql = `SELECT * FROM persona WHERE persona.idPersona=${idPersona}`;
    const personaQuery: IPersona[] = await executeQuery(conn, sql);
    if (personaQuery.length > 0) {
      sql = `SELECT * FROM mascota `;
      sql += `WHERE mascota.idPersona=${idPersona}`;
      const mascotaResult: IMascota[] = await executeQuery(conn, sql);
      result = mascotaResult;
    } else {
      result = undefined;
    }
    await commitTransaction(conn);
    await releaseAndCloseConnection(conn);
    return result;
  } catch (error) {
    if (conn) {
      await rollbackTransaction(conn);
      await releaseAndCloseConnection(conn);
    }
    return undefined;
  }
};