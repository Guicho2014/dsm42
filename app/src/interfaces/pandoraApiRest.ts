export interface UserRespose {
  id_user:    number;
  username:   string;
  email:      string;
  password:   string;
  image:      string;
  location:   string;
  update:     Date;
}

export type RequestLogin = UserRespose | false;

export enum EstadoTarea {
  pendiente = "Pendiente",
  en_proceso = "En proceso",
  completado = "Completado"
}

export interface TareaResponse {
  id_tarea:     number;
  titulo:       string;
  descripcion:  string;
  fecha_vencimiento?: string;
  estado:       EstadoTarea;
}