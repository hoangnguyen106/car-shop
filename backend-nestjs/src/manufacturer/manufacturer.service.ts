import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManufacturerDto } from './dtos/create-manufacturer.dto';
import {
  Manufacturer,
  ManufacturerDocument,
} from './schemas/manufacturer.schema';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel(Manufacturer.name)
    private readonly manufacturerModel: Model<ManufacturerDocument>,
  ) {}

  async createManufacturer(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    return await this.manufacturerModel.create(createManufacturerDto);
  }

  async getAll(): Promise<Manufacturer[]> {
    return await this.manufacturerModel.find().exec();
  }
}
