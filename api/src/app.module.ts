import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PitanjeModule } from './pitanje/pitanje.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';


@Module({
  imports: [AuthModule, PitanjeModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'upload'),
    serveRoot: '/uploads'
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
