import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateManufacturerDto } from './dtos/create-manufacturer.dto';
import { ManufacturerService } from './manufacturer.service';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  async create(@Body() createManufacturerDto: CreateManufacturerDto) {
    const result = await this.manufacturerService.createManufacturer(
      createManufacturerDto,
    );
    return result;
  }

  @Get()
  async getManufacturer() {
    return this.manufacturerService.getAll();
  }
}
