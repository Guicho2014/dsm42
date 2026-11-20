import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, MoreThanOrEqual } from 'typeorm';
import { Empleado } from './entities/empleado.entity.js';
import { CreateEmpleadoDto } from './dto/create-empleado.dto.js';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto.js';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado, "mssql-connection")
    private empleadoRepository: Repository<Empleado>,
  ) {}

  async create(data: CreateEmpleadoDto) {
    const register = this.empleadoRepository.create(data);
    return await this.empleadoRepository.save(register);
  }

  async findAll() {
    return await this.empleadoRepository.find();
  }

  async findOne(id: number) {
    return await this.empleadoRepository.findOneBy({ id } as FindOptionsWhere<Empleado>);
  }

  async update(id: number, data: UpdateEmpleadoDto) {
    await this.empleadoRepository.update(id, data);
    return await this.empleadoRepository.findOneBy({ id } as FindOptionsWhere<Empleado>);
  }

  async remove(id: number) {
    return await this.empleadoRepository.delete(id);
  }

  async interMasivo(empleados: Partial<Empleado>[], tomanolote = 400) {
    for (let i = 0; i < empleados.length; i += tomanolote) {
      await this.empleadoRepository
        .createQueryBuilder()
        .insert()
        .into(Empleado)
        .values(empleados.slice(i, i + tomanolote))
        .execute();
    }
  }

  async paginado(pagina: number = 1, limite: number = 50) {
    const [data, total] = await this.empleadoRepository.findAndCount({
      order: { id: 'DESC' } as any,
      skip: (pagina - 1) * limite,
      take: limite,
    });
    
    return {
      total,
      paginaActual: pagina,
      totalPaginas: Math.ceil(total / limite),
      data
    };
  }

  async data() {
    const total_empleados = await this.empleadoRepository.count();

    const estadisticas = await this.empleadoRepository
      .createQueryBuilder('e')
      .select('AVG(e.salario_mensual)', 'salario_promedio')
      .addSelect('MIN(e.salario_mensual)', 'salario_minimo')
      .addSelect('MAX(e.salario_mensual)', 'salario_maximo')
      .addSelect('SUM(e.salario_mensual)', 'nomina_mensual_total')
      .getRawOne();

    const promedio_por_departamento = await this.empleadoRepository
      .createQueryBuilder('e')
      .select('e.departamento', 'departamento')
      .addSelect('AVG(e.salario_mensual)', 'salario_promedio')
      .groupBy('e.departamento')
      .getRawMany();

    const salario_mas_bajo = await this.empleadoRepository.find({
      order: { salario_mensual: 'ASC' },
      take: 1
    });

    const departamentos_mayores_20000 = await this.empleadoRepository
      .createQueryBuilder('e')
      .select('e.departamento', 'departamento')
      .addSelect('AVG(e.salario_mensual)', 'salario_promedio')
      .groupBy('e.departamento')
      .having('AVG(e.salario_mensual) > :min', { min: 20000 })
      .getRawMany();

    return {
      total_empleados,
      nomina_mensual_total: estadisticas.nomina_mensual_total,
      salario_promedio: estadisticas.salario_promedio,
      salario_minimo: estadisticas.salario_minimo,
      salario_maximo: estadisticas.salario_maximo,
      promedio_por_departamento,
      salario_mas_bajo,
      departamentos_mayores_20000,
    };
  }


  async paginadoTecnologia(pagina: number = 1, limite: number = 20) {
    const [data, total] = await this.empleadoRepository.findAndCount({
      where: { departamento: 'Tecnología' },
      order: { id_empleado: 'DESC' },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    
    return {
      total,
      paginaActual: pagina,
      data
    };
  }

  async paginadoContratados2022(pagina: number = 1, limite: number = 20) {
    const [data, total] = await this.empleadoRepository.findAndCount({
      where: { 
        fecha_contratacion: MoreThanOrEqual('2023-01-01') 
      },
      order: { fecha_contratacion: 'DESC' },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    
    return {
      total,
      paginaActual: pagina,
      data
    };
  }
}