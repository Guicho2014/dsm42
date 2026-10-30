import { IsNotEmpty, IsString, IsOptional, IsEmail, IsInt, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class CreateReservaDto {
  @IsString()
  @IsNotEmpty()
  nombre_huesped: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  tipo_habitacion?: string;

  @IsDateString()
  @IsOptional()
  fecha_entrada?: string;

  @IsDateString()
  @IsOptional()
  fecha_salida?: string;

  @IsInt()
  @Type(() => Number) // 👈 Convierte el string a número automáticamente
  @IsOptional()
  numero_huespedes?: number;

  @IsString()
  @IsOptional()
  solicitudes_especiales?: string;

  @IsString()
  @IsOptional()
  imagen_1?: string;

  @IsString()
  @IsOptional()
  imagen_2?: string;

  @IsString()
  @IsOptional()
  imagen_3?: string;

  @IsString()
  @IsOptional()
  imagen_4?: string;
}