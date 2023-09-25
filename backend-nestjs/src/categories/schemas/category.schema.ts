import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Manufacturer } from 'src/manufacturer/schemas/manufacturer.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Manufacturer',
  })
  manufacturer: [Manufacturer];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
