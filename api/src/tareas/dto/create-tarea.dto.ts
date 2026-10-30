import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDateString } from "class-validator";
import { EstadoTarea } from "../entities/tarea.entity.js";

export class CreateTareaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
  @IsDateString()
  @IsOptional()
  fecha_vencimiento?: string;

  @IsEnum( EstadoTarea )
  @IsOptional()
  estado: EstadoTarea;
}