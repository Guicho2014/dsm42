import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  puesto: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsNumber()
  @IsNotEmpty()
  salario_mensual: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_contratacion: string;
}