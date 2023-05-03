import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop()
  tags?: string[];

  @Prop()
  mediaUrls?: string[];

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: { type: string; coordinates: number[] };
}

export const PostSchema = SchemaFactory.createForClass(Post);
