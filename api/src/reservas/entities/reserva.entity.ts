import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Reserva {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nombre_huesped: string;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tipo_habitacion: string;

  @Column({ type: 'date', nullable: true })
  fecha_entrada: string;

  @Column({ type: 'date', nullable: true })
  fecha_salida: string;

  @Column({ type: 'int', nullable: true })
  numero_huespedes: number;

  @Column({ type: 'text', nullable: true })
  solicitudes_especiales: string;

  @Column({ type: 'longtext', nullable: true })
  imagen_1: string;

  @Column({ type: 'longtext', nullable: true })
  imagen_2: string;

  @Column({ type: 'longtext', nullable: true })
  imagen_3: string;

  @Column({ type: 'longtext', nullable: true })
  imagen_4: string;

  @CreateDateColumn({ type: 'timestamp' })
  creado_en: Date;
}