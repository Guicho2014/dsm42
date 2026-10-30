import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasModule } from './reservas/reservas.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'najimi',
      password: 'pass',
      database: 'hotel_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ReservasModule,
  ],
})
export class AppModule {}