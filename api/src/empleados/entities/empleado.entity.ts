import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empleado {
    @PrimaryGeneratedColumn()
    id_empleado: number;
    
    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    puesto: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    departamento: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    salario_mensual: number;

    @Column({ type: 'date' })
    fecha_contratacion: string;
    }