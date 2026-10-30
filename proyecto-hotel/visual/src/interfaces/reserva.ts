export interface Reserva {
  id: string;
  nombre_huesped: string;
  correo: string;
  telefono: string;
  tipo_habitacion: string;
  fecha_entrada: string;
  fecha_salida: string;
  numero_huespedes: string;
  solicitudes_especiales: string;
  imagen_1: string | null;
  imagen_2: string | null;
  imagen_3: string | null;
  imagen_4: string | null;
  creado_en: string;
}

export interface ReservaForm extends Omit<Reserva, 'id' | 'creado_en'> {}