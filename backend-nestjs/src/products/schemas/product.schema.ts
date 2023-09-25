import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { Manufacturer } from 'src/manufacturer/schemas/manufacturer.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Picture extends Document {
  @Prop({ required: true })
  potision: number;

  @Prop({ required: true })
  url: string;
}

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 64,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
    min: 10000,
    max: 1000000000,
  })
  price: number;

  @Prop({
    default: 'Chưa có mô tả gì',
    maxlength: 500,
  })
  description: string;

  @Prop()
  avatar: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
    required: true,
  })
  manufacturer: Manufacturer;

  @Prop([
    {
      type: Picture,
      ref: 'Picture',
      required: true,
    },
  ])
  pictures: [Picture] | [any];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
