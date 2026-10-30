import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Reserva } from './entities/reserva.entity.js'; 
import { CreateReservaDto } from './dto/create-reserva.dto.js';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  async create(data: CreateReservaDto) {
    const nuevaReserva = this.reservaRepository.create({
      ...data,
      id: uuidv7(),
    });
    return await this.reservaRepository.save(nuevaReserva);
  }

  async findAll() {
    return await this.reservaRepository.find({ order: { creado_en: 'DESC' } });
  }

  async findOne(id: string) {
    return await this.reservaRepository.findOneBy({ id });
  }
    async update(id: string, data: any) {
    await this.reservaRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.reservaRepository.delete(id);
    return { message: 'Reserva eliminada' };
  }
}
