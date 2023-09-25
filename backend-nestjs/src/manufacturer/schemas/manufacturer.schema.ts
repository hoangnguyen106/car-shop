import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ManufacturerDocument = Manufacturer & Document;

@Schema()
export class Manufacturer {
  @Prop({
    required: true,
  })
  name: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
