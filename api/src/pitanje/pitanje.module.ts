import { Module } from '@nestjs/common';
import { PitanjeService } from './pitanje.service';
import { PitanjeController } from './pitanje.controller';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [PitanjeController],
  providers: [PitanjeService, PrismaService]
})
export class PitanjeModule {}
