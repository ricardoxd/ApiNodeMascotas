import { ITipoMascota } from './ITipoMascota';
export interface IMascota {
  idMascota: number;
  nombre: string;
  idPersona: number;
  idTipoMascota: number;
  tipoMascota: ITipoMascota;
}
