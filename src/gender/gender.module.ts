import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';

@Module({
  providers: [GenderService],
  controllers: [GenderController],
})
export class GenderModule {}
