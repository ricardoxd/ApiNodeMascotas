import { IMascota } from './IMascota';
export interface IPersona {
  idPersona: number;
  nombre: string;
  apellido: string;
  mascotas: IMascota[]
}
