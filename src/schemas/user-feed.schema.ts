import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserFeed extends Document {
  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  userId: ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Post' }])
  postId: ObjectId[];
}

export const UserFeedSchema = SchemaFactory.createForClass(UserFeed);
