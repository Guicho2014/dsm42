import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { EmpleadosService } from './empleados.service.js';
import { CreateEmpleadoDto } from './dto/create-empleado.dto.js';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto.js';
import { Empleado } from './entities/empleado.entity.js';

@Controller('empleado')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post('masivo')
  async interMasivo(@Body() empleados: Empleado[]) {
    await this.empleadosService.interMasivo(empleados);
    return { datos_ingresados: empleados.length };
  }

  @Get('consultas/data')
  async data() {
    return await this.empleadosService.data();
  }

  @Get('consultas/paginado')
  paginado(
    @Query('pagina') pagina: number = 1,
    @Query('limite') limite: number = 50
  ) {
    return this.empleadosService.paginado(pagina, limite);
  }


  @Get('consultas/tecnologia')
  paginadoTecnologia(
    @Query('pagina') pagina: number = 1,
    @Query('limite') limite: number = 20
  ) {
    return this.empleadosService.paginadoTecnologia(pagina, limite);
  }

  @Get('consultas/contratados-2022')
  paginadoContratados2022(
    @Query('pagina') pagina: number = 1,
    @Query('limite') limite: number = 20
  ) {
    return this.empleadosService.paginadoContratados2022(pagina, limite);
  }


  @Post()
  create(@Body(new ValidationPipe()) createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  findAll() {
    return this.empleadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.empleadosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body(new ValidationPipe()) updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.empleadosService.remove(id);
  }
}