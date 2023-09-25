import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManufacturerDto } from 'src/manufacturer/dtos/create-manufacturer.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly catagoryModel: Model<CategoryDocument>,
  ) {}
  async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Category> {
    const createdCategory = await this.catagoryModel.create(
      createManufacturerDto,
    );
    return createdCategory;
  }

  async getAll(): Promise<Category[]> {
    return await this.catagoryModel.find().populate('manufacturer').exec();
  }

  async getManufactorByCategory(id: string): Promise<Category> {
    return await this.catagoryModel
      .findById(id)
      .populate('manufacturer')
      .exec();
  }
}
