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
 * Crear persona en DB
 * @param  {Persona} newPersona Datos para crear persona
 * @return {Promise<IPersona | undefined>}
 */
export const createPersonaDB = async (newPersona: IPersona): Promise<IPersona | undefined> => {
  let conn: PoolConnection | undefined;
  let result: IPersona | undefined; let sql;
  const { nombre, apellido, mascotas } = newPersona;

  try {
    conn = await getPoolConnection();
    await beginTransaction(conn);
    sql = `INSERT INTO persona (nombre, apellido) VALUES `;
    sql += `('${nombre}','${apellido}')`;
    const personaInsertResult = await executeQuery(conn, sql);
    if (mascotas) {
	    for (const element of mascotas) {
	      const { nombre, idTipoMascota } = element;
	      sql = `INSERT INTO mascota (idPersona, nombre, idTipoMascota) VALUES `;
	      sql += `(${personaInsertResult.insertId},'${nombre}', '${idTipoMascota}')`;
	      await executeQuery(conn, sql);
	    }
    }
    sql = `SELECT * FROM persona WHERE persona.idPersona=${personaInsertResult.insertId}`;
    const personaQuery: IPersona[] = await executeQuery(conn, sql);
    if (personaQuery.length > 0) {
      sql = `SELECT * FROM mascota `;
      sql += `WHERE mascota.idPersona=${personaInsertResult.insertId}`;
      const mascotaResult: IMascota[] = await executeQuery(conn, sql);
      const persona = personaQuery[0];
      result = { ...persona, mascotas: mascotaResult };
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


/**
 * Listar personas por personas en DB
 * @return {Promise<IPersona[] | undefined>}
 */
export const findPersonasDB = async (): Promise<IPersona[] | undefined> => {
  let conn: PoolConnection | undefined;
  let result: IPersona[] | undefined; let sql;

  try {
    conn = await getPoolConnection();
    await beginTransaction(conn);
    sql = `SELECT * FROM persona`;
    const personaQuery: IPersona[] = await executeQuery(conn, sql);
    if (personaQuery.length > 0) {
      result = personaQuery;
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