import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';

@ApiTags('Homepage')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get(':profileId')
  findAll(@Param('profileId') profileId: string) {
    return this.homepageService.findAll(profileId);
  }
}
