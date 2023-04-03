import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/models/owners.model';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}

}
