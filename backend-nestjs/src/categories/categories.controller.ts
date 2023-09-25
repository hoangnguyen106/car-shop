import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateManufacturerDto } from 'src/manufacturer/dtos/create-manufacturer.dto';
import { CategoriesService } from './categories.service';
// import { Category } from './schemas/category.schema';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post()
  async create(@Body() CreateManufactortDto: CreateManufacturerDto) {
    return await this.categoriesService.create(CreateManufactortDto);
  }

  @Get()
  async getCategories() {
    return await this.categoriesService.getAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.categoriesService.getManufactorByCategory(id);
  }
}
