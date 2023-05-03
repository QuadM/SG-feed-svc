import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document, ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  gender: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts?: ObjectId[];

  @Prop({ required: true, default: 0 })
  posts_count: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  followers?: ObjectId[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  following?: ObjectId[];

  @Prop({ required: true, default: 0 })
  followers_count: number;

  @Prop({ required: true, default: 0 })
  following_count: number;

  @Prop()
  isExpert?: string;

  @Prop()
  isTransportationExpert?: string;

  @Prop()
  birthDate?: Date;

  @Prop({ required: true })
  _createdAt: Date;

  @Prop({ required: true })
  _updatedAt: Date;

  @Prop()
  profession?: string;

  @Prop()
  badges?: string;

  @Prop()
  avatar?;

  @Prop()
  bio?: string;

  @Prop()
  rank?: string;

  @Prop()
  points?: string;

  @Prop()
  rating?: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  products?: ObjectId[];

  @Prop()
  favProductsList?: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// 'userId',
// 'name',
// 'email',
// 'password',
// 'gender',
// 'isExpert',
// 'isTransportationExpert',
// 'date',
// 'birthDate',
// 'profession',
// 'carOwnership',
// 'drivingExperience',
// 'avatar',
// 'badges',
// 'rank',
// 'rating',
// 'points',
// 'products',
// 'favProductsList'
