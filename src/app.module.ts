import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post, PostSchema } from './schemas/post.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserFeed, UserFeedSchema } from './schemas/user-feed.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/streetguards'),
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
      { name: UserFeed.name, schema: UserFeedSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
