import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateSensorDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsNumber()
  @IsNotEmpty()
  distancia_cm: number;

  @IsNumber()
  @IsNotEmpty()
  distancia_inch: number;

  @IsNumber()
  @IsNotEmpty()
  temperatura_celcius: number;

  @IsNumber()
  @IsNotEmpty()
  temperatura_f: number;
}