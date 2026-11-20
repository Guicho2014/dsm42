import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadosService } from './empleados.service.js';
import { EmpleadosController } from './empleados.controller.js';
import { Empleado } from './entities/empleado.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado], 'mssql-connection')],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
})
export class EmpleadosModule {}