import { Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto.js';
import { UpdateSensorDto } from './dto/update-sensor.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan, MoreThanOrEqual } from 'typeorm';
import { Sensor } from './entities/sensor.entity.js';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor, "mariadb-connection")
    private sensorRepository: Repository<Sensor>,
  ) {}

  async create(data: CreateSensorDto) {
    const register = this.sensorRepository.create(data);
    return await this.sensorRepository.save(register);
  }

  async findAll() {
    return await this.sensorRepository.find();
  }

  async findOne(id_sensor: number) {
    return await this.sensorRepository.findOneBy({ id_sensor }); // ← findOneBy
  }

  async update(id_sensor: number, data: UpdateSensorDto) {
    await this.sensorRepository.update(id_sensor, data);
    return await this.sensorRepository.findOneBy({ id_sensor }); // ← devuelve la entidad
  }

  async remove(id_sensor: number) {
    return await this.sensorRepository.delete(id_sensor);
  }

  async paginado(pagina: number = 1, limite: number = 50, baseUrl: string) {
    const data = await this.sensorRepository.find({
      order: { id_sensor: 'DESC' },
      skip: (pagina - 1) * limite,
      take: limite,
    });

    const next = `${baseUrl}?pagina=${pagina + 1}&limite=${limite}`;
    const prev = `${baseUrl}?pagina=${pagina - 1 > 0 ? pagina - 1 : 0}&limite=${limite}`;
    const author = 'Author: Pandora XDN';

    return { author, next, prev, data };
  }

  async interMasivo(lecturas: Partial<Sensor>[], tomanolote = 1000) {
    for (let i = 0; i < lecturas.length; i += tomanolote) {
      await this.sensorRepository
        .createQueryBuilder()
        .insert()
        .into(Sensor)
        .values(lecturas.slice(i, i + tomanolote))
        .execute();
    }
  }

  async total() {
    return await this.sensorRepository.count();
  }

  private async consultarPorDia(diasAtras: number) {
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - diasAtras); // ← getDate
    inicio.setHours(0, 0, 0, 0);

    const fin = new Date();
    fin.setDate(fin.getDate() - diasAtras); // ← getDate
    fin.setHours(23, 59, 59, 999);

    return await this.sensorRepository.find({
      where: { fecha: Between(inicio, fin) },
      order: { id_sensor: 'DESC' },
      take: 5,
    });
  }

  private async alertas() {
    return await this.sensorRepository.find({
      where: { temperatura_celcius: MoreThan(35) },
      order: { temperatura_celcius: 'ASC' },
      take: 10,
    });
  }

  private async ultimasHoras(horas: number) {
    const desde = new Date(Date.now() - horas * 60 * 60 * 1000);
    return await this.sensorRepository.find({
      where: { fecha: MoreThanOrEqual(desde) },
      order: { fecha: 'DESC' },
      take: 10,
    });
  }

  private async estadisticas() {
    return await this.sensorRepository
      .createQueryBuilder('s')
      .select('COUNT(*)', 'total')
      .addSelect('AVG(s.temperatura_celcius)', 'temp_promedio')
      .addSelect('MIN(s.temperatura_celcius)', 'temp_minima')
      .addSelect('MAX(s.temperatura_celcius)', 'temp_maxima')
      .addSelect('AVG(s.distancia_cm)', 'dist_promedio')
      .getRawOne();
  }

  private async topTemperaturas() {
    return await this.sensorRepository
      .createQueryBuilder('s')
      .select('s.id_sensor')
      .addSelect('s.temperatura_celcius')
      .orderBy('s.temperatura_celcius', 'DESC')
      .limit(10)
      .getMany();
  }

  private async diasFrios() {
    return await this.sensorRepository
      .createQueryBuilder('s')
      .select('DATE(s.fecha)', 'dia')
      .addSelect('AVG(s.temperatura_celcius)', 'promedio')
      .groupBy('dia')
      .having('AVG(s.temperatura_celcius) < :max', { max: 20 }) // ← ajusta si quieres
      .orderBy('promedio', 'ASC')
      .addOrderBy('dia', 'DESC')
      .limit(10)
      .getRawMany();
  }

  private async diasCalurosos() {
    return await this.sensorRepository
      .createQueryBuilder('s')
      .select('DATE(s.fecha)', 'dia')
      .addSelect('AVG(s.temperatura_celcius)', 'promedio')
      .groupBy('dia')
      .having('AVG(s.temperatura_celcius) > :min', { min: 20 }) // ← ajusta si quieres
      .orderBy('promedio', 'DESC')
      .addOrderBy('dia', 'DESC')
      .limit(10)
      .getRawMany();
  }

  async data() {
    const total = await this.total();
    const diasCalurosos = await this.diasCalurosos();
    const diasFrios = await this.diasFrios();
    const topTemperaturas = await this.topTemperaturas();
    const estadistica = await this.estadisticas();
    const ultimasHoras = await this.ultimasHoras(6);
    const alertas = await this.alertas();
    const hoy = await this.consultarPorDia(0);
    const ayer = await this.consultarPorDia(1);
    const anteayer = await this.consultarPorDia(2);

    return {
      total,
      diasFrios,
      diasCalurosos,
      topTemperaturas,
      estadistica,
      ultimasHoras,
      alertas,
      hoy,
      ayer,
      anteayer,
    };
  }
}