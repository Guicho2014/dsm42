import { Reserva } from './reservas/entities/reserva.entity.js';
import { ReservasModule } from './reservas/reservas.module.js';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Sensor } from './sensors/entities/sensor.entity.js';
import { SensorsModule } from './sensors/sensors.module.js';
import { Tarea } from './tareas/entities/tarea.entity.js';
import { TareasModule } from './tareas/tareas.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'mssql-connection',
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      password: 'P@ndoraxdn1',
      username: 'sa',
      database: 'dsm42',
      entities: [ Tarea ],
      synchronize: true,
      autoLoadEntities: true,
      options: {
        trustServerCertificate: true,
	encrypt: true,              
	enableArithAbort: true  
      }
    }),
    TypeOrmModule.forRoot({
  name: 'hotel-connection',
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3306,
  username: 'najimi',
  password: 'pass',
  database: 'hotel_db',
  entities: [Reserva],
  synchronize: true,
  autoLoadEntities: true,
}),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'dsm42',
      entities: [ User ],
      host: 'localhost',
      name: 'postgres-connection',
      password: 'pass',
      port: 5432,
      synchronize: true,
      type: 'postgres',
      username: 'najimi'
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'DSM42',
      entities: [ Sensor ],
      host: 'localhost',
      name: 'mariadb-connection',
      password: 'pass',
      port: 3306,
      synchronize: true,
      type: 'mariadb',
      username: 'najimi'
    }),
    UsersModule,
    SensorsModule,
    TareasModule,
    ReservasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




