import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum EstadoTarea {
  pendiente = "Pendiente",
  en_proceso = "En proceso",
  completado = "Completado"
}

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id_tarea: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;
  
  @Column({ type: 'date', nullable: true })
  fecha_vencimiento: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: EstadoTarea.pendiente,
  })
  estado: EstadoTarea;
}