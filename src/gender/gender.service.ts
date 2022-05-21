import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  genders: Gender[] = [];

  create(createGenderDto: CreateGenderDto): Gender {
    const gender: Gender = {
      id: 'id_aleatorio',
      ...createGenderDto,
      name: undefined,
    };
    this.genders.push(gender);
    return gender;
  }
}
